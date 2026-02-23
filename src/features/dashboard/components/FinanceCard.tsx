'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { MoreVertical } from 'lucide-react';
import { DailyFinancial } from '../types/dashboard.types';

const FALLBACK_DATA: DailyFinancial[] = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  value: 800 + Math.sin(i * 0.4) * 200 + Math.random() * 100 + i * 25,
}));

interface FinanceiroChartProps {
  data?: DailyFinancial[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-[#2BBFBF] px-3 py-1 text-white text-sm font-semibold shadow">
        R$ {payload[0].value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
      </div>
    );
  }
  return null;
};

export function FinanceiroChart({ data }: FinanceiroChartProps) {
  const chartData = data ?? FALLBACK_DATA;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700">Gráfico Financeiro</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2BBFBF" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#2BBFBF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            interval={3}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            tickFormatter={(v) => v.toLocaleString()}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#2BBFBF"
            strokeWidth={2}
            fill="url(#colorValue)"
            dot={false}
            activeDot={{ r: 5, fill: '#2BBFBF', stroke: 'white', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
