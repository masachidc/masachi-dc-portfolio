import type { MouseEvent, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type Lenis from 'lenis';
import { isExternal } from '../data/site';

const NAV_OFFSET = 96;

/**
 * Scroll to an in-page target (or the top when id is empty), via Lenis when present.
 * The target is resolved to an absolute offset from the live window position, so it
 * stays correct even when Lenis hasn't synced yet (e.g. right after a route change).
 * `instant` jumps without animating — used when arriving from another page.
 */
export function scrollToTarget(id: string, { instant = false } = {}) {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  const el = id ? document.getElementById(id) : null;
  if (id && !el) return;
  const top = el ? Math.max(0, el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET) : 0;
  if (lenis) {
    lenis.scrollTo(top, { immediate: instant, force: true });
  } else {
    window.scrollTo({ top, behavior: instant ? 'auto' : 'smooth' });
  }
}

/**
 * One link for every site destination:
 * - external / mailto → <a>, new tab for http(s) only
 * - "/" or "/#section" → router link that smooth-scrolls when already on that page
 * - other internal paths → router link
 */
export function SiteLink({
  href,
  className,
  children,
  onNavigate,
  ariaLabel,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
  ariaLabel?: string;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  if (isExternal(href)) {
    const newTab = href.startsWith('http');
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className={className}
        onClick={onNavigate}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  const [path, hash = ''] = href.split('#');
  const targetPath = path || '/';

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onNavigate?.();
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (location.pathname === targetPath) {
      scrollToTarget(hash);
      if (location.hash !== (hash ? `#${hash}` : '')) {
        window.history.replaceState(null, '', hash ? `#${hash}` : targetPath);
      }
    } else {
      navigate(hash ? `${targetPath}#${hash}` : targetPath);
    }
  }

  return (
    <Link to={href} aria-label={ariaLabel} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
