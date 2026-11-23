'use client';
import {useEffect, useState} from 'react';
import {brand} from '@/brand';
import {href, localeMeta, locales, type Locale} from '@/i18n/config';
import {useI18n} from '@/i18n/I18nProvider';
import {whatsappUrl} from '@/lib/attribution';
import {track} from '@/lib/track';
import {Icon} from '../Icon';
import {Logo} from '../Logo';
import {WhatsAppGlyph} from '../StickyCta';

/** Links to the same page in each language. `full` shows names (English, العربية…) instead of short codes. */
function LangSwitch({current, label, full = false}: {current: Locale; label: string; full?: boolean}) {
  return (
    <nav className={`lang ${full ? 'lang--full' : ''}`} aria-label={label}>
      {locales.map((l) => {
        const m = localeMeta[l];
        return (
          <a key={l} href={href(l)} hrefLang={m.hreflang} lang={m.htmlLang} aria-current={l === current ? 'true' : undefined} title={m.label}>
            {full ? m.label : m.short}
          </a>
        );
      })}
    </nav>
  );
}

/** Sticky white nav. Section links scroll in-page; on phones a full-screen sheet opens. */
export function Nav() {
  const {locale, t} = useI18n();
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

  const wa = whatsappUrl(brand.whatsapp, t.common.whatsappText);
  return (
    <>
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="wrap nav__in">
        <a href="#top" aria-label={t.common.home}><Logo size={24} /></a>
        <nav className="nav__links" aria-label={t.common.mainNav}>
          {t.nav.map((n) => <a key={n.href} href={n.href} className={active === n.href ? 'is-active' : ''}>{n.label}</a>)}
        </nav>
        <div className="nav__acts">
          <LangSwitch current={locale} label={t.common.language} />
          <a className="icon-btn wa" href={wa} target="_blank" rel="noopener" aria-label={t.common.whatsappAria} onClick={() => track('whatsapp_click', {location: 'nav'})}><WhatsAppGlyph size={18} /></a>
          <a className="btn btn--ink" href="#contact" onClick={() => track('cta_click', {location: 'nav'})}>{t.common.letsTalk} <Icon name="arrowRight" size={16} /></a>
          <button className="nav__menu" aria-label={t.common.openMenu} aria-expanded={open} aria-controls="menu-sheet" onClick={() => setOpen(true)}><Icon name="menu" size={18} /></button>
        </div>
      </div>
    </header>
    {/* Outside <header>: its backdrop-filter would make it the containing block for this fixed sheet. */}
      <div className={`sheet ${open ? 'open' : ''}`} id="menu-sheet" role="dialog" aria-modal="true" aria-label={t.common.menu} inert={!open}>
        <div className="sheet__top">
          <Logo size={24} />
          <button className="nav__menu" aria-label={t.common.closeMenu} onClick={() => setOpen(false)}><Icon name="x" size={18} /></button>
        </div>
        {t.nav.map((n) => <a key={n.href} className="lnk" href={n.href}>{n.label}</a>)}
        <LangSwitch current={locale} label={t.common.language} full />
        <a className="btn btn--primary btn--block" href="#contact">{t.common.startProject} <Icon name="arrowUpRight" size={18} /></a>
      </div>
    </>
  );
}
