import type {ReactNode} from 'react';
import {brand} from '@/content';
import {Icon} from './Icon';
import {Logo} from './Logo';

/** Shell for the secondary pages (thank-you, privacy, terms). */
export function SubPage({children, narrow = true}: {children: ReactNode; narrow?: boolean}) {
  return (
    <>
      <header className="sub-top">
        <a href="/" aria-label="EC4YOU home"><Logo size={24} /></a>
        <a className="sub-top__back" href="/"><Icon name="arrowLeft" size={16} /> Home</a>
      </header>
      <main className={`sub ${narrow ? 'sub--narrow' : ''}`}>{children}</main>
      <footer className="sub-foot">
        <span>© {new Date().getFullYear()} EC4YOU</span>
        <nav aria-label="Legal">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="#cookie-settings">Cookie Settings</a>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
        </nav>
      </footer>
    </>
  );
}
