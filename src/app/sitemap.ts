import type {MetadataRoute} from 'next';
import {href, localeMeta, locales} from '@/i18n/config';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ec4you.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [localeMeta[l].hreflang, `${SITE}${href(l)}`]));
  return [
    ...locales.map((l) => ({url: `${SITE}${href(l)}`, changeFrequency: 'monthly' as const, priority: 1, alternates: {languages}})),
    {url: `${SITE}/privacy`, changeFrequency: 'yearly', priority: 0.2},
    {url: `${SITE}/terms`, changeFrequency: 'yearly', priority: 0.2},
  ];
}
