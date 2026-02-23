'use client';

import { useState } from 'react';
import { useRegister } from '../hooks/mutations/useRegister';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
  const router = useRouter();
  const { mutateAsync, isPending, error } = useRegister();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await mutateAsync({ name, email, password });
      router.push('/login');
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
        <h1 className="text-2xl font-semibold">Criar conta</h1>
        <p className="text-sm text-gray-500">Preencha os dados para se cadastrar</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Nome</label>
        <input
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          required
        />
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
        <p className="text-sm text-red-500">{error.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-black py-2 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? 'Criando conta...' : 'Criar conta'}
      </button>

      <p className="text-center text-sm text-gray-500">
        Já tem uma conta?{' '}
        <a href="/login" className="font-medium text-black underline">
          Entrar
        </a>
      </p>
    </form>
  );
}