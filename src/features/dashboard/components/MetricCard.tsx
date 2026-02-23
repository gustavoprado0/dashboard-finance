'use client';

import { LucideIcon } from 'lucide-react';

function Sparkline({ trend }: { trend: string }) {
  const upPath = "M0,20 C10,18 20,15 30,12 C40,9 50,11 60,8 C70,5 80,7 90,4 C95,3 98,2 100,1";
  const downPath = "M0,1 C10,3 20,5 30,8 C40,11 50,9 60,12 C70,15 80,13 90,16 C95,17 98,19 100,20";
  const color = trend === 'up' ? '#2BBFBF' : '#2BBFBF';

  return (
    <svg width="100" height="24" viewBox="0 0 100 24" fill="none">
      <path
        d={trend === 'up' ? upPath : downPath}
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
}

export function MetricCard({ title, value, icon: Icon, trend }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 text-gray-500">
          <Icon className="h-4 w-4" />
          <span className="text-sm font-medium">{title}</span>
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <Sparkline trend={trend} />
      </div>
    </div>
  );
}
