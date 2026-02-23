export const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ApiErrorResponse = {
  message?: string;
  error?: string;
  statusCode?: number;
};

function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export async function api<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = getToken();

  const headers = new Headers({
    'Content-Type': 'application/json',
    ...(options?.headers || {}),
  });

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    cache: 'no-store',
  });

  // Se não autenticado (expirou token)
  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    throw new Error('Unauthorized');
  }

  let data: unknown = null;

  try {
    data = await response.json();
  } catch {
    // resposta sem body (204 por exemplo)
  }

  if (!response.ok) {
    const error = data as ApiErrorResponse;

    throw new Error(
      error?.message ||
        error?.error ||
        `API Error: ${response.status}`
    );
  }

  return data as T;
}