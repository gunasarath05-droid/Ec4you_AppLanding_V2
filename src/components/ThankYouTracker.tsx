'use client';
import {useEffect} from 'react';
import {track} from '@/lib/track';

/**
 * Fires the "lead" conversion exactly once per submitted form: the form sets
 * a session flag before redirecting here, and this clears it. Refreshing or
 * bookmarking the page never counts again. Waits briefly so tags loaded by
 * consent have time to initialise.
 */
export function ThankYouTracker() {
  useEffect(() => {
    let service: string | null = null;
    try {
      service = sessionStorage.getItem('ec_lead_pending');
      sessionStorage.removeItem('ec_lead_pending');
    } catch {}
    if (service === null) return;
    const t = window.setTimeout(() => track('lead', service ? {service} : {}), 800);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}
