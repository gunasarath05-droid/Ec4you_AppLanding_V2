'use client';
import {useEffect} from 'react';
import {useReducedMotion} from '@/hooks/useReducedMotion';
import {onFrame} from '@/lib/scroll';

/**
 * Scroll-linked motion, driven by the same Lenis rAF loop as everything else.
 *
 *  [data-speed="0.1"]   parallax: moves by (distance from viewport centre × speed).
 *                       Uses the CSS `translate` property, so it composes with any
 *                       transform animation already on the element.
 *  [data-hero-exit]     lifts and fades as the hero scrolls away.
 *  [data-expand]        a panel that grows from a rounded inset card to full width
 *                       as it enters (sets --e from 0 to 1).
 *
 * Positions are measured once per resize (layout boxes, not transformed ones),
 * so each frame only does arithmetic and style writes.
 */
type Item = {el: HTMLElement; kind: 'speed' | 'exit' | 'expand'; speed: number; top: number; h: number};

export function Motion() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let items: Item[] = [];
    const measure = () => {
      const y = scrollY;
      items = [...document.querySelectorAll<HTMLElement>('[data-speed],[data-hero-exit],[data-expand]')].map((el) => {
        const prev = el.style.translate;
        el.style.translate = '';
        const r = el.getBoundingClientRect();
        el.style.translate = prev;
        return {
          el,
          kind: el.hasAttribute('data-hero-exit') ? 'exit' : el.hasAttribute('data-expand') ? 'expand' : 'speed',
          speed: parseFloat(el.dataset.speed || '0'),
          top: r.top + y,
          h: r.height,
        };
      });
      // Parallax is a desktop nicety; phones keep things still and readable.
      if (innerWidth < 760) items = items.filter((i) => i.kind === 'expand');
    };
    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(document.body);

    let lastY = -1;
    const off = onFrame(() => {
      const y = scrollY;
      if (y === lastY) return;
      lastY = y;
      const vh = innerHeight;
      for (const it of items) {
        const top = it.top - y;
        if (top > vh * 1.2 || top + it.h < -vh * 0.2) continue;
        if (it.kind === 'speed') {
          const d = top + it.h / 2 - vh / 2;
          it.el.style.translate = `0 ${(d * it.speed).toFixed(1)}px`;
        } else if (it.kind === 'exit') {
          const p = Math.min(1, Math.max(0, y / (it.h * 0.9)));
          it.el.style.translate = `0 ${(-p * 60).toFixed(1)}px`;
          it.el.style.opacity = String(1 - p * 0.85);
        } else {
          const p = Math.min(1, Math.max(0, (vh - top) / (vh * 0.75)));
          it.el.style.setProperty('--e', p.toFixed(3));
        }
      }
    });
    return () => {
      off();
      ro.disconnect();
      for (const it of items) { it.el.style.translate = ''; it.el.style.opacity = ''; it.el.style.removeProperty('--e'); }
    };
  }, [reduced]);

  return null;
}
