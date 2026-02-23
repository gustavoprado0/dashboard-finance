'use client';

import { useQuery } from '@tanstack/react-query';
import { authService } from '../../services';
import { authQueryKeys } from '../../constants/queryKeys';

export function useUser() {
  return useQuery({
    queryKey: authQueryKeys.user(),
    queryFn: () => authService.getMe(),
    retry: false,
    staleTime: 1000 * 60 * 5, 
  });
}