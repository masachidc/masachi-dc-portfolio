import type { CSSProperties } from 'react';
import { SiteLink } from './SiteLink';

/**
 * MASACHI DC custom wordmark, one path per glyph, same geometry as
 * brand/masachi-dc-wordmark.svg (viewBox units: cap height 115, overshoot 2).
 */
const GLYPHS = [
  'M0 2L21 2L68 70.9L115 2L136 2L136 117L115 117L115 37.2L72.2 100L63.8 100L21 37.2L21 117L0 117Z',
  'M202 117L263.5 2L281.5 2L343 117L320.5 117L272.5 27.2L224.5 117Z',
  'M496.5 29C496.5 14.5 475.1 0 449 0C423.1 0 402 14.4 402 32C402 80.6 479 59 479 86C479 95.3 468.4 101.5 452.5 101.5C433.5 101.5 418 90.2 418 81L398 89.5C398 99.8 420.5 119 448 119C482.4 119 501 107.5 501 86C501 41 425 59.5 425 33C425 25 435.6 18.5 448.5 18.5C462.8 18.5 477 27.2 477 36Z',
  'M557 117L618.5 2L636.5 2L698 117L675.5 117L627.5 27.2L579.5 117Z',
  'M881.4 37.5A65.5 59.5 0 1 0 881.4 81.5L860.3 75.5A43 42 0 1 1 860.3 43.5Z',
  'M950 2L971 2L971 49.5L1037.5 49.5L1037.5 2L1058.5 2L1058.5 117L1037.5 117L1037.5 66.5L971 66.5L971 117L950 117Z',
  'M1145 2L1166 2L1166 117L1145 117Z',
  'M1317 2L1373 2C1409.9 2 1434.5 25 1434.5 59.5C1434.5 94 1409.9 117 1373 117L1317 117ZM1338 19L1338 100L1372 100C1393.6 100 1412 81.4 1412 59.5C1412 37.6 1393.6 19 1372 19Z',
  'M1625.4 37.5A65.5 59.5 0 1 0 1625.4 81.5L1604.3 75.5A43 42 0 1 1 1604.3 43.5Z',
];

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
  const height = size === 'md' ? 'h-3' : 'h-2.5';

  return (
    <SiteLink
      href="/"
      ariaLabel="Masachi DC — home"
      onNavigate={onNavigate}
      className={`group inline-flex items-center py-2 ${color}`}
    >
      <svg viewBox="0 0 1625.4 119" aria-hidden className={`${height} w-auto overflow-visible`} fill="currentColor">
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
