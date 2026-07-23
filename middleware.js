// Bloqueio de acesso ao módulo Loja neste deploy (branch Alterações-Zoetis).
// O cliente Zoetis deve enxergar apenas o Hub; qualquer request para /loja
// (inclusive digitando a URL direto) é redirecionado para /hub/.
export default function middleware(request) {
  const { pathname } = new URL(request.url);

  if (pathname === '/loja' || pathname.startsWith('/loja/')) {
    return Response.redirect(new URL('/hub/', request.url), 307);
  }
}

export const config = {
  matcher: ['/loja', '/loja/:path*'],
};
