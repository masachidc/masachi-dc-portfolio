import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { buildHead, type PageMeta } from './head';

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
 * Per-route document metadata for this SPA, kept in step on client-side
 * navigation. The build writes the same tags into each route's HTML
 * (buildHead), for crawlers and link unfurlers that don't run JS.
 */
export function usePageMeta({ title, description, noindex }: PageMeta = {}) {
  const { pathname } = useLocation();

  useEffect(() => {
    const head = buildHead(pathname, { title, description, noindex });
    document.title = head.title;
    setCanonical(head.canonical);
    for (const [attr, key, content] of head.tags) setMeta(attr, key, content);
  }, [title, description, noindex, pathname]);
}
