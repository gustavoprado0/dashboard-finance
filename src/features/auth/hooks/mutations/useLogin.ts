'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../../services';
import type { LoginRequestDTO } from '../../types';

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequestDTO) =>
      authService.login(data),

    onSuccess: (response) => {
      // atualiza cache global do usuário (padrão enterprise)
      queryClient.setQueryData(['auth', 'me'], response.user);
    },
  });
}