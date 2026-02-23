'use client';

import { useQuery } from '@tanstack/react-query';
import { authService } from '../services';

export function useAuth() {
  const {
    data: user,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authService.getMe,
    staleTime: 1000 * 60 * 5, 
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    user,
    isLoading: isLoading || isFetching,
    isAuthenticated: !!user,
  };
}