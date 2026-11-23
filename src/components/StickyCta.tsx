'use client';
import {useEffect, useRef} from 'react';
import {brand, sticky} from '@/content';
import {whatsappUrl} from '@/lib/attribution';
import {onFrame} from '@/lib/scroll';
import {track} from '@/lib/track';
import {Icon} from './Icon';

function WhatsAppGlyph({size = 20}: {size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 21.5h-.01a9.46 9.46 0 0 1-4.82-1.32l-.35-.2-3.58.94.96-3.49-.23-.36A9.44 9.44 0 0 1 2.6 12a9.45 9.45 0 0 1 16.13-6.68A9.38 9.38 0 0 1 21.5 12c0 5.2-4.24 9.45-9.45 9.5Zm8.04-17.54A11.3 11.3 0 0 0 12.05.6C5.78.6.68 5.7.68 11.97c0 2 .52 3.96 1.52 5.69L.58 23.4l5.88-1.54a11.34 11.34 0 0 0 5.43 1.38h.01c6.27 0 11.37-5.1 11.37-11.37 0-3.04-1.18-5.9-3.33-8.05Z" />
    </svg>
  );
}

/**
 * - Phones: a bottom bar with "Let's Talk" + WhatsApp, shown after the hero
 *   and hidden while the contact form itself is on screen.
 * - Desktop: WhatsApp sits in the nav instead.
 */
export function StickyCta() {
  const bar = useRef<HTMLDivElement>(null);
    const wa = whatsappUrl(brand.whatsapp, brand.whatsappText);

  useEffect(() => {
    let last = '';
    return onFrame(() => {
      const hero = document.getElementById('top');
      const form = document.getElementById('contact');
      if (!hero || !form) return;
      const past = hero.getBoundingClientRect().bottom < innerHeight * 0.4;
      const f = form.getBoundingClientRect();
      const atForm = f.top < innerHeight * 0.7 && f.bottom > innerHeight * 0.3;
      const state = past && !atForm ? 'show' : '';
      if (state === last) return;
      last = state;
      bar.current?.classList.toggle('show', !!state);
    });
  }, []);

  return (
    <>
      <div className="sticky-cta" ref={bar}>
        <a className="btn btn--primary" href="#contact" onClick={() => track('cta_click', {location: 'sticky_bar'})}>
          {sticky.primary} <Icon name="arrowRight" size={16} />
        </a>
        <a className="sticky-cta__wa" href={wa} target="_blank" rel="noopener" aria-label={`${sticky.whatsapp} (opens WhatsApp)`} onClick={() => track('whatsapp_click', {location: 'sticky_bar'})}>
          <WhatsAppGlyph />
        </a>
      </div>
    </>
  );
}

export {WhatsAppGlyph};
