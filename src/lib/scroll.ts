import Lenis from 'lenis';

/**
 * One animation loop for the whole page. Lenis advances first, then every
 * scroll-driven component reads its own position and writes styles directly.
 * Nothing goes through React state while scrolling, except discrete index
 * changes (which card, which phase), so scrolling never re-renders the page.
 */

type Tick = (time: number, dt: number) => void;

const subscribers = new Set<Tick>();
let lenis: Lenis | null = null;

export function startScroll(reducedMotion: boolean): () => void {
  if (!reducedMotion) {
    lenis = new Lenis({lerp: 0.1, smoothWheel: true, wheelMultiplier: 0.9});
  }
  let raf = 0;
  let last = 0;
  const loop = (time: number) => {
    const dt = last ? Math.min(0.1, (time - last) / 1000) : 1 / 60;
    last = time;
    lenis?.raf(time);
    subscribers.forEach((fn) => fn(time, dt));
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  return () => {
    cancelAnimationFrame(raf);
    lenis?.destroy();
    lenis = null;
  };
}

export function onFrame(fn: Tick): () => void {
  subscribers.add(fn);
  return () => {
    subscribers.delete(fn);
  };
}

export function scrollToY(y: number, duration = 1.4) {
  if (lenis) lenis.scrollTo(y, {duration});
  else window.scrollTo({top: y});
}

/** Smooth-scrolls to an in-page hash like `#process`, or to the top for `#top`. */
export function scrollToHash(hash: string) {
  if (hash === '#top') {
    scrollToY(0, 1.6);
  } else {
    const el = document.querySelector<HTMLElement>(hash);
    if (!el) return;
    scrollToY(el.getBoundingClientRect().top + window.scrollY, 1.6);
  }
  history.replaceState(null, '', hash === '#top' ? ' ' : hash);
}

/** Scrolls so a pinned scene sits at progress `p` (0–1) of its timeline. */
export function scrollToProgress(scene: HTMLElement, p: number) {
  const top = scene.getBoundingClientRect().top + window.scrollY;
  const span = scene.offsetHeight - window.innerHeight;
  scrollToY(top + span * p, 1.1);
}
