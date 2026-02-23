'use client';

import { useState, useEffect } from 'react';
import { DashboardData } from '../types/dashboard.types';

interface UseDashboardReturn {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
}

export function useDashboard(startDate: string, endDate: string): UseDashboardReturn {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (startDate) params.set('startDate', startDate);
        if (endDate) params.set('endDate', endDate);

        const res = await fetch(`/api/dashboard?${params.toString()}`);
        if (!res.ok) throw new Error(`Erro ${res.status}`);

        const json = await res.json();
        if (!json.success) throw new Error(json.message ?? 'Erro desconhecido');

        if (!cancelled) setData(json.data as DashboardData);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Erro inesperado');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [startDate, endDate]);

  return { data, isLoading, error };
}