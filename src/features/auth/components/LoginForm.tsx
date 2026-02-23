'use client';

import { useState } from 'react';
import { useLogin } from '../hooks';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const { mutateAsync, isPending, error } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await mutateAsync({
        email,
        password,
      });

      // Redireciona após login
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-4 rounded-2xl border p-6 shadow-sm"
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="text-sm text-gray-500">
          Entre na sua conta para continuar
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Senha</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          required
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">
          Email ou senha inválidos
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-black py-2 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}