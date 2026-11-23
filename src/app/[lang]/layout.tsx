import type {Metadata, Viewport} from 'next';
import {notFound} from 'next/navigation';
import {SiteScripts} from '@/components/SiteScripts';
import {I18nProvider} from '@/i18n/I18nProvider';
import {alternates, getDict, isLocale, localeMeta, locales} from '@/i18n';
import '../globals.css';

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({lang}));

type Props = {params: Promise<{lang: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {lang} = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang).meta;
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ec4you.com'),
    alternates: alternates(lang),
    title: t.title,
    description: t.description,
    openGraph: {title: t.ogTitle, description: t.ogDescription, type: 'website', locale: localeMeta[lang].ogLocale},
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#ffffff',
};

const FONTS = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap';
const ARABIC_FONT = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap';

export default async function RootLayout({children, params}: Props & {children: React.ReactNode}) {
  const {lang} = await params;
  if (!isLocale(lang)) notFound();
  const m = localeMeta[lang];
  return (
    <html lang={m.htmlLang} dir={m.dir}>
      <head>
        {/* Linked, not bundled: keeps builds offline-safe. Swap for next/font if you prefer self-hosting. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href={FONTS} rel="stylesheet" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        {lang === 'ar' && <link href={ARABIC_FONT} rel="stylesheet" />}
      </head>
      {/* Browser extensions (e.g. ColorZilla's cz-shortcut-listen) inject attributes on <body> before hydration. */}
      <body suppressHydrationWarning>
        <I18nProvider locale={lang} dict={getDict(lang)}>
          {children}
          <SiteScripts />
        </I18nProvider>
      </body>
    </html>
  );
}
