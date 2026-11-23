'use client';
import Script from 'next/script';
import {useEffect, useState} from 'react';
import {useI18n} from '@/i18n/I18nProvider';
import {captureAttribution} from '@/lib/attribution';

/**
 * Consent banner + tracking tags.
 *
 * - Google Tag Manager always loads, but in Google Consent Mode v2 with every
 *   storage type "denied" until the visitor accepts. GA4 and Google Ads tags
 *   inside GTM then respect that choice (cookieless pings only while denied).
 * - Meta Pixel and LinkedIn Insight don't support Consent Mode, so they are
 *   only added to the page after the visitor accepts.
 * - The choice is remembered; "Cookie Settings" in the footer reopens it.
 * - Also records the visit's UTM tags / ad click IDs for lead attribution.
 */

const KEY = 'ec_consent';
type Choice = 'granted' | 'denied' | null;

const GTM = process.env.NEXT_PUBLIC_GTM_ID;
const PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const LINKEDIN = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;
const anyTag = Boolean(GTM || PIXEL || LINKEDIN);

export function SiteScripts() {
  const [choice, setChoice] = useState<Choice>(null);
  const [open, setOpen] = useState(false);
  const {t} = useI18n();
  const copy = t.consent;

  useEffect(() => {
    captureAttribution();
    let saved: Choice = null;
    try {
      saved = localStorage.getItem(KEY) as Choice;
    } catch {}
    setChoice(saved);
    if (!saved && anyTag) setOpen(true);

    // "Cookie Settings" link: capture before the smooth-scroll link handler.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href="#cookie-settings"]');
      if (!a) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      setOpen(true);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  const decide = (c: Exclude<Choice, null>) => {
    try {
      localStorage.setItem(KEY, c);
    } catch {}
    const w = window as Window & {gtag?: (...a: unknown[]) => void};
    const v = c === 'granted' ? 'granted' : 'denied';
    w.gtag?.('consent', 'update', {ad_storage: v, analytics_storage: v, ad_user_data: v, ad_personalization: v});
    setChoice(c);
    setOpen(false);
  };

  return (
    <>
      {GTM && (
        <Script id="gtm" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          var c = null; try { c = localStorage.getItem('${KEY}'); } catch(e) {}
          var v = c === 'granted' ? 'granted' : 'denied';
          gtag('consent', 'default', {ad_storage: v, analytics_storage: v, ad_user_data: v, ad_personalization: v, wait_for_update: 500});
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');
        `}</Script>
      )}

      {choice === 'granted' && PIXEL && (
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL}'); fbq('track', 'PageView');
        `}</Script>
      )}

      {choice === 'granted' && LINKEDIN && (
        <Script id="linkedin-insight" strategy="afterInteractive">{`
          window._linkedin_partner_id = "${LINKEDIN}";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(window._linkedin_partner_id);
          (function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li/lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s);})(window.lintrk);
        `}</Script>
      )}

      {open && (
        <div className="consent-bar" role="dialog" aria-modal="false" aria-labelledby="consent-title">
          <div>
            <b id="consent-title">{copy.title}</b>
            <p>
              {copy.body} <a href="/privacy" hrefLang="en">{t.common.privacy}</a>
            </p>
          </div>
          <div className="consent-bar__acts">
            {/* Equal weight on purpose: rejecting must be as easy as accepting. */}
            <button className="btn btn--outline" onClick={() => decide('denied')}>{copy.reject}</button>
            <button className="btn btn--ink" onClick={() => decide('granted')}>{copy.accept}</button>
          </div>
        </div>
      )}
    </>
  );
}
