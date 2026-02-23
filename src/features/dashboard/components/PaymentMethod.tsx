'use client';

import { ChevronDown, CreditCard, QrCode, ScrollText } from 'lucide-react';

const payments = [
  {
    name: 'Pix',
    percentage: 60,
    value: 'R$ 1.000.000,00',
    icon: (
      <QrCode />
    ),
    color: '#2BBFBF',
  },
  {
    name: 'Cartão',
    percentage: 60,
    value: 'R$ 1.000.000,00',
    icon: (
      <CreditCard />
    ),
    color: '#2BBFBF',
  },
  {
    name: 'Boleto',
    percentage: 60,
    value: 'R$ 1.000.000,00',
    icon: (
      <ScrollText />
    ),
    color: '#2BBFBF',
  },
];

export function PaymentMethods() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <button className="flex items-center gap-1 text-sm font-semibold text-gray-700">
          Meios de Pagamentos
          <ChevronDown className="h-4 w-4" />
        </button>
        <span className="text-sm text-gray-400">Ultimos 6 Meses</span>
      </div>

      <div className="space-y-4">
        {payments.map((payment) => (
          <div key={payment.name} className="flex items-center gap-4">
            {/* Icon */}
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-gray-600">
              {payment.icon}
            </div>

            {/* Name */}
            <span className="w-16 flex-shrink-0 text-sm font-medium text-gray-700">
              {payment.name}
            </span>

            {/* Progress Bar */}
            <div className="flex-1">
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${payment.percentage}%`,
                    backgroundColor: payment.color,
                  }}
                />
              </div>
            </div>

            {/* Percentage */}
            <span className="w-10 flex-shrink-0 text-right text-sm font-medium text-gray-600">
              {payment.percentage}%
            </span>

            {/* Value */}
            <span className="w-36 flex-shrink-0 text-right text-sm font-semibold text-gray-900">
              {payment.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
