'use client';

import { useState } from 'react';
import {
  ShoppingCart,
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
import { useDashboard } from '../hooks';

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <BarChart2 className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="mb-1 text-base font-semibold text-gray-700">Nenhum dado encontrado</h3>
      <p className="text-sm text-gray-400">
        Não há transações no período selecionado.
      </p>
    </div>
  );
}

export default function Dashboard() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { data, isLoading, error } = useDashboard(startDate, endDate);

  const isEmpty =
    !isLoading &&
    !error &&
    data &&
    data.metrics.transactionCount === 0 &&
    data.paymentMethods.length === 0;

  const pixSummary = data?.paymentMethods.find((p) => p.method === 'pix');
  const cardSummary = data?.paymentMethods.find((p) => p.method === 'credit_card');

  const metrics = data
    ? [
        { title: 'Vendas Aprovadas Hoje', value: formatBRL(data.metrics.approvedSalesToday), icon: ShoppingCart, trend: 'up' },
        { title: 'Pedidos Pagos', value: formatBRL(data.metrics.paidOrders), icon: ShoppingCart, trend: 'up' },
        { title: 'Reserva Financeira', value: formatBRL(data.metrics.financialReserve), icon: PiggyBank, trend: 'up' },
        { title: 'Pré-Chargebacks', value: formatBRL(data.metrics.preChargebacks), icon: DollarSign, trend: 'down' },
        { title: 'Ticket Médio', value: formatBRL(data.metrics.averageTicket), icon: Tag, trend: 'up' },
        { title: 'Quantidade de Transações', value: String(data.metrics.transactionCount), icon: BarChart2, trend: 'up' },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="mb-6 flex-row sm:flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-2 w-full">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 shadow-sm w-full sm:w-auto">
            <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="outline-none text-sm text-gray-500 bg-transparent w-full"
            />
          </div>
          <span className="text-gray-400 text-sm text-center sm:text-left">Até</span>
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 shadow-sm w-full sm:w-auto">
            <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="outline-none text-sm text-gray-500 bg-transparent w-full"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          Erro ao carregar dados: {error}
        </div>
      )}

      {isLoading && (
        <>
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-gray-200" />
            ))}
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="flex flex-col gap-4">
              <div className="h-36 animate-pulse rounded-2xl bg-gray-200" />
              <div className="h-36 animate-pulse rounded-2xl bg-gray-200" />
            </div>
            <div className="lg:col-span-2 h-72 animate-pulse rounded-2xl bg-gray-200" />
          </div>
          <div className="mb-6 h-64 animate-pulse rounded-2xl bg-gray-200" />
          <div className="h-48 animate-pulse rounded-2xl bg-gray-200" />
        </>
      )}

      {isEmpty && <EmptyState />}

      {!isLoading && !isEmpty && !error && (
        <>
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric, i) => (
              <MetricCard key={i} {...metric} />
            ))}
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="flex flex-col gap-4">
              <DonutCard
                label="Pix"
                sublabel="Resumo de Vendas"
                value={pixSummary ? formatBRL(pixSummary.totalAmount) : 'R$ 0,00'}
                percentage={pixSummary?.percentage ?? 0}
                color="#2BBFBF"
              />
              <DonutCard
                label="Cartão de Crédito"
                sublabel="Resumo de Vendas"
                value={cardSummary ? formatBRL(cardSummary.totalAmount) : 'R$ 0,00'}
                percentage={cardSummary?.percentage ?? 0}
                color="#1a1a2e"
              />
            </div>
            <div className="lg:col-span-2">
              <FaturamentoChart data={data?.monthlyBilling} />
            </div>
          </div>

          <div className="mb-6">
            <FinanceiroChart data={data?.dailyFinancial} />
          </div>

          <div>
            <PaymentMethods data={data?.paymentMethods} />
          </div>
        </>
      )}
    </div>
  );
}