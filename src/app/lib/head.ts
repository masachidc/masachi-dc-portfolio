import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, DEPLOY_URL, OG_IMAGE, SITE_NAME, SITE_URL, TWITTER_HANDLE } from '../data/site';

/** Content hash of public/og-image.png (vite.config.ts), so unfurlers refetch when the image changes. */
declare const __OG_IMAGE_VERSION__: string;

export interface PageMeta {
  /** Page-specific title; the site name is appended. Omit on the homepage. */
  title?: string;
  description?: string;
  /** Keep the page out of search results (drafts, placeholders, 404). */
  noindex?: boolean;
}

export interface Head {
  title: string;
  canonical: string;
  tags: [attr: 'name' | 'property', key: string, content: string][];
}

/**
 * Every document-level tag for a route. One source for both the runtime
 * (usePageMeta) and the static HTML written per route at build time
 * (scripts/prerender-head.mjs), which is all crawlers and unfurlers see.
 */
export function buildHead(pathname: string, { title, description = DEFAULT_DESCRIPTION, noindex = false }: PageMeta = {}): Head {
  const fullTitle = title ? `${title} | Nathan Masachi` : DEFAULT_TITLE;
  const path = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
  const image = `${DEPLOY_URL}${OG_IMAGE.path}?v=${__OG_IMAGE_VERSION__}`;

  return {
    title: fullTitle,
    canonical: `${SITE_URL}${path}`,
    tags: [
      ['name', 'description', description],
      ['name', 'robots', noindex ? 'noindex, follow' : 'index, follow'],

      ['property', 'og:title', fullTitle],
      ['property', 'og:description', description],
      ['property', 'og:url', `${DEPLOY_URL}${path}`],
      ['property', 'og:site_name', SITE_NAME],
      ['property', 'og:locale', 'en_US'],
      ['property', 'og:type', path.startsWith('/works/') ? 'article' : 'website'],
      ['property', 'og:image', image],
      ['property', 'og:image:type', OG_IMAGE.type],
      ['property', 'og:image:width', String(OG_IMAGE.width)],
      ['property', 'og:image:height', String(OG_IMAGE.height)],
      ['property', 'og:image:alt', OG_IMAGE.alt],

      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:site', TWITTER_HANDLE],
      ['name', 'twitter:title', fullTitle],
      ['name', 'twitter:description', description],
      ['name', 'twitter:image', image],
      ['name', 'twitter:image:alt', OG_IMAGE.alt],
    ],
  };
}
