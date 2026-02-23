'use client';

import { useAuth } from '@/features/auth/hooks';
import { LogoutButton } from '@/features/auth/components';
import Dashboard from '@/features/dashboard/components/DashboardComponent';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen flex-col gap-6 p-8">


      <div className="rounded-2xl border border-gray-200 p-6 flex items-center justify-between">
        <div className='flex flex-col'>
          <p className="text-lg">
            Bem-vindo, <strong>{user?.name}</strong>
          </p>
          <p className="text-sm text-gray-500">
            {user?.email}
          </p>
        </div>
        <LogoutButton />
      </div>

      <Dashboard />
    </div>
  );
}