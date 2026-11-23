import {NextResponse, type NextRequest} from 'next/server';

/**
 * English lives at `/` with no prefix; Arabic and French at `/ar` and `/fr`.
 * Pages are built once per locale under app/[lang], so unprefixed URLs are
 * rewritten to `/en/...` internally, and `/en/...` redirects to the clean URL.
 * Keep these lists in sync with src/i18n/config.ts.
 */
const PREFIXED = ['ar', 'fr'];

export function middleware(req: NextRequest) {
  const {pathname} = req.nextUrl;
  const first = pathname.split('/')[1];

  if (first === 'en') {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url, 308);
  }
  if (PREFIXED.includes(first)) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/en${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals and any file with an extension (logos, icon, robots.txt, sitemap.xml).
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
