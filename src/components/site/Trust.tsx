import {trust} from '@/content';

/** Client logos. Slots are placeholders until real logos (with permission) are added. */
export function Trust() {
  return (
    <section className="trust" aria-label="Clients">
      <div className="wrap">
        <p>{trust.label}</p>
        <ul className="logos">{trust.logos.slice(0, 5).map((l, i) => <li key={i}>{l}</li>)}</ul>
      </div>
    </section>
  );
}
