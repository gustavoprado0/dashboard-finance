'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services';

export function LogoutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // limpa cache do usuário
      queryClient.removeQueries({ queryKey: ['auth', 'me'] });

      // 🔥 MUITO IMPORTANTE: replace em vez de push
      router.replace('/login');
    },
  });

  return (
    <button
      onClick={() => mutate()}
      disabled={isPending}
      className="rounded-xl border px-4 py-2 text-sm font-medium"
    >
      {isPending ? 'Saindo...' : 'Sair'}
    </button>
  );
}