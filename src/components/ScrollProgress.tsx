'use client';
import {useEffect, useRef} from 'react';
import {onFrame} from '@/lib/scroll';

/** A thin brand-orange bar at the very top: how far through the page you are. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let last = -1;
    return onFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, scrollY / max) : 0;
      if (Math.abs(p - last) < 0.0005) return;
      last = p;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    });
  }, []);
  return <div className="scroll-progress" ref={ref} aria-hidden="true" />;
}
