'use client';

import { ChevronDown, CreditCard, QrCode, ScrollText } from 'lucide-react';
import { PaymentMethodSummary } from '../types/dashboard.types';

const METHOD_CONFIG: Record<
  PaymentMethodSummary['method'],
  { label: string; icon: React.ReactNode }
> = {
  pix: { label: 'Pix', icon: <QrCode /> },
  credit_card: { label: 'Cartão', icon: <CreditCard /> },
  boleto: { label: 'Boleto', icon: <ScrollText /> },
};

const FALLBACK: PaymentMethodSummary[] = [
  { method: 'pix', totalAmount: 200000, percentage: 23 },
  { method: 'credit_card', totalAmount: 1000000, percentage: 60 },
  { method: 'boleto', totalAmount: 1000000, percentage: 17 },
];

interface PaymentMethodsProps {
  data?: PaymentMethodSummary[];
}

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function PaymentMethods({ data }: PaymentMethodsProps) {
  const payments = data ?? FALLBACK;

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <button className="flex items-center gap-1 text-sm font-semibold text-gray-700">
          Meios de Pagamentos
          <ChevronDown className="h-4 w-4" />
        </button>
        <span className="text-sm text-gray-400">Últimos 6 Meses</span>
      </div>

      <div className="space-y-5">
        {payments.map((payment) => {
          const config = METHOD_CONFIG[payment.method];
          return (
            <div
              key={payment.method}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
            >
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-gray-600">
                  {config.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">{config.label}</span>
              </div>

              <div className="flex items-center gap-3 w-full">
                <div className="flex-1">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full transition-all duration-500 bg-[#2BBFBF]"
                      style={{ width: `${payment.percentage}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
                  {payment.percentage}%
                </span>
              </div>

              <span className="text-right text-sm font-semibold text-gray-900 sm:w-36 sm:flex-shrink-0">
                {formatBRL(payment.totalAmount)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
