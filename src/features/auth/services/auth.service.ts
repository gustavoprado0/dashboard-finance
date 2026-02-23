import type { LoginRequestDTO, LoginResponseDTO, User } from '../types';

export const authService = {
  async login(data: LoginRequestDTO): Promise<LoginResponseDTO> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Email ou senha inválidos');
    }

    const response: LoginResponseDTO = await res.json();

    if (typeof window !== 'undefined') {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      document.cookie = `token=${response.token}; path=/`;
    }

    return response;
  },

  async logout(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  },

  async getMe(): Promise<User | null> {
    if (typeof window === 'undefined') return null;

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) return null;

    try {
      return JSON.parse(user) as User;
    } catch {
      return null;
    }
  },

  async register(data: { name: string; email: string; password: string }) {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Erro ao criar conta');
    }
  
    return res.json();
  },
};