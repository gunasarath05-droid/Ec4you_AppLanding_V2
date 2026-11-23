'use client';
import {useState} from 'react';
import {brand, faq} from '@/content';
import {useReveals} from '@/hooks/useReveals';
import {whatsappUrl} from '@/lib/attribution';
import {track} from '@/lib/track';
import {Icon} from '../Icon';
import {WhatsAppGlyph} from '../StickyCta';

export function Faq() {
  const ref = useReveals<HTMLElement>();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" ref={ref} className="sec sec--alt" aria-labelledby="faq-title">
      <div className="wrap faq">
        <div className="faq__intro" data-reveal>
          <span className="eyebrow">FAQ</span>
          <h2 className="h2" id="faq-title">{faq.heading}</h2>
          <div className="askbox">
            <b>Still have a question?</b>
            <p>Talk to our team directly — we’ll help you find the right approach.</p>
            <div>
              <a className="btn btn--ink" href="#contact">Let’s Talk <Icon name="arrowRight" size={16} /></a>
              <a className="btn btn--wa" href={whatsappUrl(brand.whatsapp, brand.whatsappText)} target="_blank" rel="noopener" onClick={() => track('whatsapp_click', {location: 'faq'})}><span className="wa"><WhatsAppGlyph size={18} /></span>WhatsApp</a>
            </div>
          </div>
        </div>
        <ul className="acc" data-reveal>
          {faq.items.map(([q, a], i) => (
            <li key={q} className={open === i ? 'open' : ''}>
              <button id={`fq${i}`} aria-expanded={open === i} aria-controls={`fa${i}`} onClick={() => setOpen(open === i ? null : i)}>
                {q}<span className="pm"><Icon name="plus" size={16} /></span>
              </button>
              <div className="a" id={`fa${i}`} role="region" aria-labelledby={`fq${i}`}><div><p>{a}</p></div></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
