'use client';
import {useEffect, useRef} from 'react';

/**
 * Adds `.is-in` to every `[data-reveal]` inside the returned ref the first
 * time it enters the viewport. Each section owns its observer, so elements
 * that mount later are never left hidden.
 */
export function useReveals<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }),
      {rootMargin: '0px 0px -10% 0px'},
    );
    const watch = () => root.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el));
    watch();
    const mo = new MutationObserver(watch);
    mo.observe(root, {childList: true, subtree: true});
    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
  return ref;
}
