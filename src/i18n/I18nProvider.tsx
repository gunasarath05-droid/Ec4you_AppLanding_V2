'use client';
import {createContext, useContext, type ReactNode} from 'react';
import type {Locale} from './config';
import type {Dict} from './en';

/**
 * The page's language and copy, passed down once from the [lang] layout.
 * Only the active locale's dictionary reaches the browser.
 */
const I18n = createContext<{locale: Locale; t: Dict} | null>(null);

export function I18nProvider({locale, dict, children}: {locale: Locale; dict: Dict; children: ReactNode}) {
  return <I18n.Provider value={{locale, t: dict}}>{children}</I18n.Provider>;
}

export function useI18n() {
  const v = useContext(I18n);
  if (!v) throw new Error('useI18n must be used inside <I18nProvider>');
  return v;
}
