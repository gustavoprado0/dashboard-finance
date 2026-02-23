import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('token')?.value;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // Se não tem token e tenta acessar rota privada
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se está logado e tenta acessar login
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Protege todas as rotas exceto:
     * - api
     * - _next
     * - static
     * - arquivos públicos
     */
    '/((?!api|_next|favicon.ico).*)',
  ],
};