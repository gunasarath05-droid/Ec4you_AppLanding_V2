'use client';
import type {ReactNode} from 'react';
import {brand} from '@/brand';
import {href} from '@/i18n/config';
import {useI18n} from '@/i18n/I18nProvider';
import {Icon} from './Icon';
import {Logo} from './Logo';

/** Shell for the secondary pages (thank-you, privacy, terms). */
export function SubPage({children, narrow = true}: {children: ReactNode; narrow?: boolean}) {
  const {locale, t} = useI18n();
  const home = href(locale);
  return (
    <>
      <header className="sub-top">
        <a href={home} aria-label={t.common.home}><Logo size={24} /></a>
        <a className="sub-top__back" href={home}><Icon name="arrowLeft" size={16} /> {t.common.homeShort}</a>
      </header>
      <main className={`sub ${narrow ? 'sub--narrow' : ''}`}>{children}</main>
      <footer className="sub-foot">
        <span>© {new Date().getFullYear()} EC4YOU</span>
        <nav aria-label={t.common.legal}>
          {/* Legal pages are English-only. */}
          <a href="/privacy" hrefLang="en">{t.common.privacy}</a>
          <a href="/terms" hrefLang="en">{t.common.terms}</a>
          <a href="#cookie-settings">{t.common.cookies}</a>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
        </nav>
      </footer>
    </>
  );
}
