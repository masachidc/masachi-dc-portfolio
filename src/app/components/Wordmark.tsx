import type { CSSProperties } from 'react';
import { SiteLink } from './SiteLink';
import wordmarkSvg from '../../../brand/masachi-dc-wordmark.svg?raw';

/**
 * brand/masachi-dc-wordmark.svg is the single source of the mark: its viewBox and
 * one path per glyph are read at build time, so editing that file updates the site.
 */
const VIEW_BOX = wordmarkSvg.match(/viewBox="([^"]+)"/)![1];
const GLYPHS = Array.from(wordmarkSvg.matchAll(/<path d="([^"]+)"/g), (m) => m[1]);

/**
 * On hover each glyph slides right in proportion to its index, so the mark opens up
 * slightly, like a label being read up close. Always links home (smooth-scrolls to
 * top when already there).
 */
export function Wordmark({
  tone = 'dark',
  size = 'md',
  onNavigate,
}: {
  tone?: 'dark' | 'light';
  size?: 'sm' | 'md';
  onNavigate?: () => void;
}) {
  const color = tone === 'dark' ? 'text-ink' : 'text-bone';
  const height = size === 'md' ? 'h-3.75' : 'h-3';

  return (
    <SiteLink
      href="/"
      ariaLabel="Masachi DC — home"
      onNavigate={onNavigate}
      className={`group inline-flex items-center py-2 ${color}`}
    >
      <svg viewBox={VIEW_BOX} aria-hidden className={`${height} w-auto overflow-visible`} fill="currentColor">
        {GLYPHS.map((d, i) => (
          <path
            key={i}
            d={d}
            style={{ '--i': i } as CSSProperties}
            className="transition-transform duration-500 ease-out-premium group-hover:translate-x-[calc(var(--i)*10px)]"
          />
        ))}
      </svg>
    </SiteLink>
  );
}
