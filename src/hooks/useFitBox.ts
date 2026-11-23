'use client';
import {useLayoutEffect, useRef} from 'react';

/**
 * Scales a fixed-size design (e.g. a 1280×640 panel) down to fit the space
 * its wrapper gets: the wrapper's width and, when pinned, whatever height is
 * left in the viewport below `reserve` px. Keeps the composition intact on
 * laptops and tablets instead of re-flowing absolutely positioned pieces.
 */
/** `reserve` = px kept free in the viewport when pinned; `null` fits by width only. */
/** `minWidth`: below this viewport width the box isn't scaled (0 = always scale). */
export function useFitBox<T extends HTMLElement>(designW: number, designH: number, reserve: number | null, enabled = true, minWidth = 900) {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const box = ref.current;
    if (!box) return;
    const inner = box.firstElementChild as HTMLElement | null;
    if (!inner) return;
    const fit = () => {
      if (!enabled || window.innerWidth < minWidth) {
        inner.style.transform = '';
        inner.style.marginLeft = '';
        box.style.height = '';
        return;
      }
      const byW = box.clientWidth / designW;
      const byH = reserve === null ? Infinity : (window.innerHeight - reserve) / designH;
      const s = Math.min(1, byW, byH);
      inner.style.transform = `scale(${s})`;
      inner.style.width = `${designW}px`;
      // Centre the scaled panel when height, not width, is the limit.
      inner.style.marginLeft = `${Math.max(0, (box.clientWidth - designW * s) / 2)}px`;
      box.style.height = `${designH * s}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    window.addEventListener('resize', fit);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', fit);
    };
  }, [designW, designH, reserve, enabled, minWidth]);
  return ref;
}
