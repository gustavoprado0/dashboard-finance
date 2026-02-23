export interface DashboardMetrics {
    approvedSalesToday: number;
    paidOrders: number;
    financialReserve: number;
    preChargebacks: number;
    averageTicket: number;
    transactionCount: number;
  }
  
  export type PaymentMethodType = 'pix' | 'credit_card' | 'boleto';
  
  export interface PaymentMethodSummary {
    method: PaymentMethodType;
    totalAmount: number;
    percentage: number;
  }
  
  export interface MonthlyBilling {
    month: string;
    faturamento: number;
    estornado: number;
  }
  
  export interface DailyFinancial {
    day: number;
    value: number;
  }
  
  export interface DashboardData {
    metrics: DashboardMetrics;
    paymentMethods: PaymentMethodSummary[];
    monthlyBilling: MonthlyBilling[];
    dailyFinancial: DailyFinancial[];
  }
  
  export interface DateRangeFilter {
    startDate?: string; 
    endDate?: string;
  }