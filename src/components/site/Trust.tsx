import {clients} from '@/brand';

/** Logo height by shape, so wide wordmarks and square badges read at a similar visual weight. */
const heightFor = (w: number, h: number) => {
  const r = w / h;
  return r >= 3.5 ? 30 : r >= 2.4 ? 38 : r >= 1.5 ? 46 : 56;
};

function Row({hidden, scale}: {hidden: boolean; scale: number}) {
  return (
    <ul className="marquee__track" aria-hidden={hidden || undefined}>
      {clients.map(([file, name, w, h]) => {
        const ht = Math.round(heightFor(w, h) * scale);
        return (
          <li key={file}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/clients/${file}.webp`} alt={hidden ? '' : name} width={Math.round((w / h) * ht)} height={ht} loading="lazy" decoding="async" />
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Client logos from www.ec4you.in in an endless strip (used in the hero). The row
 * is rendered twice so the loop is seamless; the copy is hidden from screen
 * readers. Hover pauses it; with reduced motion the logos wrap into a still grid.
 */
export function LogoMarquee({label, scale = 1}: {label: string; scale?: number}) {
  return (
    <div className="marquee" dir="ltr" role="region" aria-label={label}>
      <Row hidden={false} scale={scale} />
      <Row hidden scale={scale} />
    </div>
  );
}
