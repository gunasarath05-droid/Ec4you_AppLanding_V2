'use client';
import {useEffect} from 'react';
import {useReducedMotion} from '@/hooks/useReducedMotion';
import {scrollToHash, startScroll} from '@/lib/scroll';

/** Starts the page's single rAF loop and routes every in-page link through Lenis. */
export function ScrollEngine() {
  const reduced = useReducedMotion();

  useEffect(() => {
    // Pinned scenes depend on scroll position; always start at the top.
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => startScroll(reduced), [reduced]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute('href') ?? '';
      if (hash.length < 2) return;
      e.preventDefault();
      scrollToHash(hash);
      document.dispatchEvent(new CustomEvent('ec:navigate'));
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
