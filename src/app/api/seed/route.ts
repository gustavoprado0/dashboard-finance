import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const statuses = ['APPROVED', 'PAID', 'REFUNDED', 'PRE_CHARGEBACK', 'PENDING'] as const;
const methods = ['pix', 'credit_card', 'boleto'] as const;

function randomBetween(min: number, max: number) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function randomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function dateWithinLastMonths(months: number): Date {
  const now = new Date();
  const past = new Date();
  past.setMonth(now.getMonth() - months);
  return new Date(past.getTime() + Math.random() * (now.getTime() - past.getTime()));
}

export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { success: false, message: 'Seed não permitido em produção' },
      { status: 403 },
    );
  }

  try {
    await prisma.transaction.deleteMany();
    await prisma.financialReserve.deleteMany();

    await prisma.transaction.createMany({
      data: Array.from({ length: 300 }, () => ({
        amount: randomBetween(50, 5000),
        status: randomItem(statuses),
        paymentMethod: randomItem(methods),
        createdAt: dateWithinLastMonths(12),
      })),
    });

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    await prisma.transaction.createMany({
      data: Array.from({ length: 10 }, () => ({
        amount: randomBetween(100, 2000),
        status: 'APPROVED' as const,
        paymentMethod: randomItem(methods),
        createdAt: new Date(
          todayStart.getTime() + Math.random() * (Date.now() - todayStart.getTime()),
        ),
      })),
    });

    await prisma.financialReserve.createMany({
      data: Array.from({ length: 10 }, () => ({
        amount: randomBetween(500, 10000),
        createdAt: dateWithinLastMonths(3),
      })),
    });

    const [txCount, reserveCount] = await Promise.all([
      prisma.transaction.count(),
      prisma.financialReserve.count(),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Seed concluído com sucesso!',
      data: { transactions: txCount, financialReserves: reserveCount },
    });
  } catch (error) {
    console.error('[POST /api/seed]', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao executar seed' },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { success: false, message: 'Não permitido em produção' },
      { status: 403 },
    );
  }

  try {
    const [transactions, reserves] = await Promise.all([
      prisma.transaction.deleteMany(),
      prisma.financialReserve.deleteMany(),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Dados deletados com sucesso!',
      data: {
        transactionsDeletadas: transactions.count,
        reservasDeletadas: reserves.count,
      },
    });
  } catch (error) {
    console.error('[DELETE /api/seed]', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao deletar dados' },
      { status: 500 },
    );
  }
}