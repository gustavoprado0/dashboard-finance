'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { MonthlyBilling } from '../types/dashboard.types';

const FALLBACK_DATA: MonthlyBilling[] = [
  { month: 'Jan', faturamento: 900, estornado: 300 },
  { month: 'Feb', faturamento: 850, estornado: 250 },
  { month: 'Mar', faturamento: 880, estornado: 280 },
  { month: 'Apr', faturamento: 920, estornado: 320 },
  { month: 'May', faturamento: 860, estornado: 260 },
  { month: 'Jun', faturamento: 950, estornado: 350 },
  { month: 'Jul', faturamento: 870, estornado: 270 },
  { month: 'Aug', faturamento: 910, estornado: 310 },
  { month: 'Sep', faturamento: 890, estornado: 290 },
  { month: 'Oct', faturamento: 930, estornado: 330 },
  { month: 'Nov', faturamento: 875, estornado: 275 },
  { month: 'Dec', faturamento: 960, estornado: 360 },
];

interface FaturamentoChartProps {
  data?: MonthlyBilling[];
}

export function FaturamentoChart({ data }: FaturamentoChartProps) {
  const chartData = data ?? FALLBACK_DATA;

  return (
    <div className="h-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold text-gray-700">Faturamento x Estornado</h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData} barSize={14} barGap={2}>
          <CartesianGrid vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            tickFormatter={(v) => `R$${v}`}
          />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
          />
          <Bar dataKey="faturamento" fill="#2BBFBF" radius={[4, 4, 0, 0]} name="Faturamento" />
          <Bar dataKey="estornado" fill="#d1d5db" radius={[4, 4, 0, 0]} name="Estornado" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
