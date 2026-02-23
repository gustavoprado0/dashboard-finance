'use client';

import { useAuth } from '@/features/auth/hooks';
import { LogoutButton } from '@/features/auth/components';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>
        <LogoutButton />
      </div>

      <div className="rounded-2xl border p-6">
        <p className="text-lg">
          Bem-vindo, <strong>{user?.name}</strong>
        </p>
        <p className="text-sm text-gray-500">
          {user?.email}
        </p>
      </div>
    </div>
  );
}