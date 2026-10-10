import type { MouseEvent, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isExternal } from '../data/site';
import { scrollToTarget } from '../lib/scroll';

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
  ariaCurrent,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
  ariaLabel?: string;
  ariaCurrent?: 'page';
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
        {newTab && <span className="sr-only"> (opens in a new tab)</span>}
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
    <Link to={href} aria-label={ariaLabel} aria-current={ariaCurrent} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
