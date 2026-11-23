import type {Metadata, Viewport} from 'next';
import {SiteScripts} from '@/components/SiteScripts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ec4you.com'),
  alternates: {canonical: '/'},
  title: 'EC4YOU — We Build Apps That Move Businesses Forward',
  description:
    'Custom mobile app development, AI-powered solutions and digital product engineering for businesses in the UAE, Canada and worldwide.',
  openGraph: {
    title: 'EC4YOU — Custom Mobile App Development',
    description: 'From bold startup ideas to enterprise-ready digital products.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#ffffff',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        {/* Linked, not bundled: keeps builds offline-safe. Swap for next/font if you prefer self-hosting. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <SiteScripts />
      </body>
    </html>
  );
}
