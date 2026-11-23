import type {MetadataRoute} from 'next';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ec4you.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {url: `${SITE}/`, changeFrequency: 'monthly', priority: 1},
    {url: `${SITE}/privacy`, changeFrequency: 'yearly', priority: 0.2},
    {url: `${SITE}/terms`, changeFrequency: 'yearly', priority: 0.2},
  ];
}
