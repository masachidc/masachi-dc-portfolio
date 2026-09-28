import { SiteLink } from './SiteLink';

/**
 * MASACHI DC — a single, widely tracked wordmark. On hover the tracking
 * opens up slightly, like a label being read up close. Always links home
 * (smooth-scrolls to top when already there).
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
  const fontSize = size === 'md' ? 'text-[15px]' : 'text-[13px]';

  return (
    <SiteLink
      href="/"
      ariaLabel="Masachi DC — home"
      onNavigate={onNavigate}
      className={`group inline-flex items-center py-2 ${color}`}
    >
      <span
        className={`font-display ${fontSize} font-extrabold uppercase leading-none tracking-[0.32em] transition-[letter-spacing] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:tracking-[0.38em]`}
        // Trailing letter-spacing would push the mark off-centre; pull it back.
        style={{ marginRight: '-0.32em' }}
      >
        Masachi DC
      </span>
    </SiteLink>
  );
}
