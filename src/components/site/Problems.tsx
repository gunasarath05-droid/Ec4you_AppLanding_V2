'use client';
import {problems} from '@/content';
import {useReveals} from '@/hooks/useReveals';
import {Icon} from '../Icon';

/** Four reasons projects stall. Each card's dot-dash line has a broken dash that closes on hover. */
const Morse = () => (
  <svg className="morse" viewBox="0 0 92 8" aria-hidden="true">
    <circle cx="4" cy="4" r="3.5" fill="#FF6633" /><rect x="14" y="1.5" width="22" height="5" fill="#FF6633" />
    <rect className="gap" x="44" y="1.5" width="22" height="5" fill="#FF6633" opacity=".25" transform="translate(0 2) rotate(-12)" />
    <circle cx="80" cy="4" r="3.5" fill="#FF6633" />
  </svg>
);

export function Problems() {
  const ref = useReveals<HTMLElement>();
  return (
    <section id="problems" ref={ref} className="sec" aria-labelledby="prob-title">
      <div className="wrap problems__grid">
        <div className="problems__intro" data-reveal>
          <span className="eyebrow">{problems.eyebrow}</span>
          <h2 className="h2" id="prob-title">{problems.heading}</h2>
          <p className="lead">{problems.intro}</p>
          <a className="link" href="#process">{problems.link} <Icon name="arrowRight" size={16} /></a>
        </div>
        <ol className="cards2 swipe">
          {problems.items.map((p, i) => (
            <li key={p.title} className="pcard" data-reveal style={{transitionDelay: `${i * 80}ms`}}>
              <div className="pcard__top"><span className="num">0{i + 1}</span><Morse /></div>
              <h3 className="h3">{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
