'use client';

interface DonutCardProps {
  label: string;
  sublabel: string;
  value: string;
  percentage: number;
  color: string;
}

export function DonutCard({ label, sublabel, value, percentage, color }: DonutCardProps) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Donut */}
      <div className="relative flex-shrink-0">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="#f0f0f0"
            strokeWidth="10"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 40 40)"
          />
        </svg>
      </div>

      {/* Info */}
      <div>
        <p className="text-base font-semibold text-gray-900">{label}</p>
        <p className="text-xs text-gray-400">{sublabel}</p>
        <p className="mt-1 text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
