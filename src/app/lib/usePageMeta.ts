import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, OG_IMAGE, OG_IMAGE_ALT, SITE_NAME, SITE_URL } from '../data/site';

interface PageMeta {
  /** Page-specific title; the site name is appended. Omit on the homepage. */
  title?: string;
  description?: string;
  /** Keep the page out of search results (drafts, placeholders, 404). */
  noindex?: boolean;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Per-route document metadata for this SPA. index.html carries the same
 * defaults statically for crawlers and link unfurlers that don't run JS.
 */
export function usePageMeta({ title, description = DEFAULT_DESCRIPTION, noindex = false }: PageMeta = {}) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} | Nathan Masachi` : DEFAULT_TITLE;
    const url = `${SITE_URL}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`;

    document.title = fullTitle;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
    setCanonical(url);

    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:type', pathname.startsWith('/works/') ? 'article' : 'website');
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', OG_IMAGE);
    setMeta('property', 'og:image:alt', OG_IMAGE_ALT);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:image', OG_IMAGE);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
  }, [title, description, noindex, pathname]);
}
