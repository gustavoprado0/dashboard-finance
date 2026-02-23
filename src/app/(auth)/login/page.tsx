'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks';
import { LoginForm } from '@/features/auth/components';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) return null;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className='flex flex-col gap-3'>
        <div className='flex justify-between items-center gap-5'>
          <p>Não tem uma conta?</p>
          <Link href='/register' className='text-blue-300 hover:text-blue-500 underline'>Criar Conta</Link>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}