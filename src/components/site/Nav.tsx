'use client';
import {useEffect, useState} from 'react';
import {brand, nav} from '@/content';
import {whatsappUrl} from '@/lib/attribution';
import {track} from '@/lib/track';
import {Icon} from '../Icon';
import {Logo} from '../Logo';
import {WhatsAppGlyph} from '../StickyCta';

/** Sticky white nav. Section links scroll in-page; on phones a full-screen sheet opens. */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 8);
    onScroll();
    addEventListener('scroll', onScroll, {passive: true});
    const close = () => setOpen(false);
    document.addEventListener('ec:navigate', close);
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)), {rootMargin: '-45% 0px -50% 0px'});
    document.querySelectorAll('main section[id]').forEach((s) => io.observe(s));
    return () => {
      removeEventListener('scroll', onScroll);
      document.removeEventListener('ec:navigate', close);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [open]);

  const wa = whatsappUrl(brand.whatsapp, brand.whatsappText);
  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="wrap nav__in">
        <a href="#top" aria-label="EC4YOU home"><Logo size={24} /></a>
        <nav className="nav__links" aria-label="Main">
          {nav.map((n) => <a key={n.href} href={n.href} className={active === n.href ? 'is-active' : ''}>{n.label}</a>)}
        </nav>
        <div className="nav__acts">
          <a className="icon-btn wa" href={wa} target="_blank" rel="noopener" aria-label="Chat on WhatsApp (opens WhatsApp)" onClick={() => track('whatsapp_click', {location: 'nav'})}><WhatsAppGlyph size={18} /></a>
          <a className="btn btn--ink" href="#contact" onClick={() => track('cta_click', {location: 'nav'})}>Let’s Talk <Icon name="arrowRight" size={16} /></a>
          <button className="nav__menu" aria-label="Open menu" aria-expanded={open} aria-controls="menu-sheet" onClick={() => setOpen(true)}><Icon name="menu" size={18} /></button>
        </div>
      </div>
      <div className={`sheet ${open ? 'open' : ''}`} id="menu-sheet" role="dialog" aria-modal="true" aria-label="Menu" inert={!open}>
        <div className="sheet__top">
          <Logo size={24} />
          <button className="nav__menu" aria-label="Close menu" onClick={() => setOpen(false)}><Icon name="x" size={18} /></button>
        </div>
        {nav.map((n) => <a key={n.href} className="lnk" href={n.href}>{n.label}</a>)}
        <a className="btn btn--primary btn--block" href="#contact">Start Your App Project <Icon name="arrowUpRight" size={18} /></a>
      </div>
    </header>
  );
}
