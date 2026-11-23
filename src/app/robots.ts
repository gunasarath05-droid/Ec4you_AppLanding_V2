import type {MetadataRoute} from 'next';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ec4you.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{userAgent: '*', allow: '/', disallow: ['/thank-you', '/ar/thank-you', '/fr/thank-you', '/api/']}],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
