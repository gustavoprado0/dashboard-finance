import { prisma } from '@/lib/prisma';
import { DailyFinancial, DashboardData, DashboardMetrics, DateRangeFilter, MonthlyBilling, PaymentMethodSummary } from '../types/dashboard.types';

export function buildDateFilter(filter?: DateRangeFilter) {
  if (!filter?.startDate && !filter?.endDate) return {};

  const createdAt: Record<string, Date> = {};
  if (filter.startDate) createdAt.gte = new Date(filter.startDate);
  if (filter.endDate) {
    const end = new Date(filter.endDate);
    end.setHours(23, 59, 59, 999);
    createdAt.lte = end;
  }

  return { createdAt };
}

export class DashboardService {
  async getDashboardData(filter?: DateRangeFilter): Promise<DashboardData> {
    const [metrics, paymentMethods, monthlyBilling, dailyFinancial] =
      await Promise.all([
        this.getMetrics(filter),
        this.getPaymentMethods(filter),
        this.getMonthlyBilling(),
        this.getDailyFinancial(filter),
      ]);

    return { metrics, paymentMethods, monthlyBilling, dailyFinancial };
  }

  async getMetrics(filter?: DateRangeFilter): Promise<DashboardMetrics> {
    const dateWhere = buildDateFilter(filter);

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const [
      approvedSalesToday,
      paidOrders,
      financialReserveRaw,
      preChargebacksRaw,
      avgTicket,
      transactionCount,
    ] = await Promise.all([
      prisma.transaction.aggregate({
        _sum: { amount: true },
        where: {
          status: 'APPROVED',
          createdAt: { gte: todayStart, lte: todayEnd },
        },
      }),
      prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { status: 'PAID', ...dateWhere },
      }),
      prisma.financialReserve.aggregate({
        _sum: { amount: true },
        where: dateWhere,
      }),
      prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { status: 'PRE_CHARGEBACK', ...dateWhere },
      }),
      prisma.transaction.aggregate({
        _avg: { amount: true },
        where: { status: { in: ['APPROVED', 'PAID'] }, ...dateWhere },
      }),
      prisma.transaction.count({
        where: dateWhere,
      }),
    ]);

    return {
      approvedSalesToday: approvedSalesToday._sum.amount ?? 0,
      paidOrders: paidOrders._sum.amount ?? 0,
      financialReserve: financialReserveRaw._sum.amount ?? 0,
      preChargebacks: preChargebacksRaw._sum.amount ?? 0,
      averageTicket: avgTicket._avg.amount ?? 0,
      transactionCount,
    };
  }

  async getPaymentMethods(filter?: DateRangeFilter): Promise<PaymentMethodSummary[]> {
    const dateWhere = buildDateFilter(filter);

    const rows = await prisma.transaction.groupBy({
      by: ['paymentMethod'],
      _sum: { amount: true },
      where: { status: { in: ['APPROVED', 'PAID'] }, ...dateWhere },
    });

    const total = rows.reduce((acc, r) => acc + (r._sum.amount ?? 0), 0);

    return rows.map((r) => ({
      method: r.paymentMethod as PaymentMethodSummary['method'],
      totalAmount: r._sum.amount ?? 0,
      percentage: total > 0 ? Math.round(((r._sum.amount ?? 0) / total) * 100) : 0,
    }));
  }

  async getMonthlyBilling(): Promise<MonthlyBilling[]> {
    const start = new Date();
    start.setMonth(start.getMonth() - 11);
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    const transactions = await prisma.transaction.findMany({
      select: { amount: true, status: true, createdAt: true },
      where: { createdAt: { gte: start } },
    });

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const map = new Map<string, { faturamento: number; estornado: number }>();

    for (const tx of transactions) {
      const key = monthNames[tx.createdAt.getMonth()];
      const entry = map.get(key) ?? { faturamento: 0, estornado: 0 };

      if (['APPROVED', 'PAID'].includes(tx.status)) {
        entry.faturamento += tx.amount;
      } else if (tx.status === 'REFUNDED') {
        entry.estornado += tx.amount;
      }

      map.set(key, entry);
    }

    const result: MonthlyBilling[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = monthNames[d.getMonth()];
      const entry = map.get(key) ?? { faturamento: 0, estornado: 0 };
      result.push({ month: key, ...entry });
    }

    return result;
  }

  async getDailyFinancial(filter?: DateRangeFilter): Promise<DailyFinancial[]> {
    const defaultStart = new Date();
    defaultStart.setDate(1);
    defaultStart.setHours(0, 0, 0, 0);

    const transactions = await prisma.transaction.findMany({
      select: { amount: true, createdAt: true },
      where: {
        status: { in: ['APPROVED', 'PAID'] },
        createdAt: {
          gte: filter?.startDate ? new Date(filter.startDate) : defaultStart,
          ...(filter?.endDate && { lte: new Date(filter.endDate) }),
        },
      },
    });

    const dayMap = new Map<number, number>();
    for (const tx of transactions) {
      const day = tx.createdAt.getDate();
      dayMap.set(day, (dayMap.get(day) ?? 0) + tx.amount);
    }

    return Array.from(dayMap.entries())
      .sort(([a], [b]) => a - b)
      .map(([day, value]) => ({ day, value }));
  }
}

export const dashboardService = new DashboardService();