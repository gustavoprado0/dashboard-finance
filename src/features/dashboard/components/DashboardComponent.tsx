'use client';

import { useState } from 'react';

import {
  ShoppingCart,
  CreditCard,
  PiggyBank,
  DollarSign,
  Tag,
  BarChart2,
} from 'lucide-react';
import { MetricCard } from './MetricCard';
import { DonutCard } from './DonutCard';
import { FaturamentoChart } from './InvoicingCard';
import { FinanceiroChart } from './FinanceCard';
import { PaymentMethods } from './PaymentMethod';

const metrics = [
  { title: 'Vendas Aprovadas Hoje', value: 'R$ 2.000,00', icon: ShoppingCart, trend: 'up' },
  { title: 'Pedidos Pagos', value: 'R$ 2.000,00', icon: ShoppingCart, trend: 'up' },
  { title: 'Reserva Financeira', value: 'R$ 2.000,00', icon: PiggyBank, trend: 'up' },
  { title: 'Pré-Chargebacks', value: 'R$ 2.000,00', icon: DollarSign, trend: 'down' },
  { title: 'Ticket Médio', value: 'R$ 2.000,00', icon: Tag, trend: 'up' },
  { title: 'Quantidade de Transações', value: 'R$ 2.000,00', icon: BarChart2, trend: 'up' },
];

export default function Dashboard() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 shadow-sm">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="outline-none text-sm text-gray-500 bg-transparent"
              placeholder="Selecione uma Data"
            />
          </div>
          <span className="text-gray-400 text-sm">Até</span>
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 shadow-sm">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="outline-none text-sm text-gray-500 bg-transparent"
              placeholder="Selecione uma Data"
            />
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric, i) => (
          <MetricCard key={i} {...metric} />
        ))}
      </div>

      {/* Middle Row: Donuts + Faturamento Chart */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Donut Cards */}
        <div className="flex flex-col gap-4">
          <DonutCard
            label="Pix"
            sublabel="Resumo de Vendas"
            value="R$ 40.206,20"
            percentage={86}
            color="#2BBFBF"
          />
          <DonutCard
            label="Cartão de Crédito"
            sublabel="Resumo de Vendas"
            value="R$ 6.421,10"
            percentage={14}
            color="#1a1a2e"
          />
        </div>

        {/* Faturamento Chart */}
        <div className="lg:col-span-2">
          <FaturamentoChart />
        </div>
      </div>

      {/* Financeiro Chart */}
      <div className="mb-6">
        <FinanceiroChart />
      </div>

      {/* Payment Methods */}
      <div>
        <PaymentMethods />
      </div>
    </div>
  );
}
