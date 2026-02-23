'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../../services';
import { authQueryKeys } from '../../constants/queryKeys';

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authQueryKeys.user() });
    },
  });
}