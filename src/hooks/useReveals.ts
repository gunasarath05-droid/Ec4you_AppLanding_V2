'use client';
import {useEffect, useRef} from 'react';

/**
 * Adds `.is-in` to every `[data-reveal]` inside the returned ref the first
 * time it enters the viewport. Each section owns its observer, so elements
 * that mount later are never left hidden.
 *
 * React rewrites the whole `class` attribute when a dynamic className changes
 * (e.g. a step becoming `on`), which would drop `.is-in` and hide the element
 * again. Revealed elements are remembered and get `.is-in` back straight away
 * (mutation callbacks run before the next paint, so nothing flickers).
 */
export function useReveals<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const shown = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          shown.add(e.target);
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }),
      {rootMargin: '0px 0px -10% 0px'},
    );
    const watch = () => root.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => !shown.has(el) && io.observe(el));
    watch();
    const mo = new MutationObserver((records) => {
      let added = false;
      for (const r of records) {
        if (r.type === 'childList') added = true;
        else {
          const el = r.target as Element;
          // Only when missing: re-adding an existing class still queues a mutation and would loop.
          if (shown.has(el) && !el.classList.contains('is-in')) el.classList.add('is-in');
        }
      }
      if (added) watch();
    });
    mo.observe(root, {childList: true, subtree: true, attributes: true, attributeFilter: ['class']});
    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
  return ref;
}
