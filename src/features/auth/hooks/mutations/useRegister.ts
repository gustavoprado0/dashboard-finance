'use client';

import { useMutation } from '@tanstack/react-query';
import { authService } from '../../services';

export function useRegister() {
  return useMutation({
    mutationFn: (data: { name: string; email: string; password: string }) =>
      authService.register(data),
  });
}