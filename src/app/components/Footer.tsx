import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { CONTACT_LINKS, NAV_LINKS } from '../data/site';
import { SiteLink, scrollToTarget } from './SiteLink';
import { Wordmark } from './Wordmark';

const COLUMN_TITLE = 'mb-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-bone/30';
const COLUMN_LINK =
  'group inline-flex items-center gap-1.5 text-[13px] font-medium text-bone/60 transition-colors duration-300 hover:text-bone';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-deep text-bone">
      <div className="mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-16">
        {/* ── Top: identity + link columns ── */}
        <div className="grid grid-cols-1 gap-14 py-16 md:grid-cols-[1fr_auto] md:gap-24 md:py-20">
          <div className="flex flex-col gap-5">
            <Wordmark tone="light" />
            <p className="max-w-[32ch] text-[14px] leading-[1.7] text-bone/45">
              A product designer who ships.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-16 sm:gap-24">
            <nav aria-label="Footer">
              <p className={COLUMN_TITLE}>Navigate</p>
              <ul className="flex flex-col gap-3.5">
                {NAV_LINKS.map((item) => (
                  <li key={item.label}>
                    <SiteLink href={item.href} className={COLUMN_LINK}>
                      {item.label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className={COLUMN_TITLE}>Connect</p>
              <ul className="flex flex-col gap-3.5">
                {CONTACT_LINKS.map((c) => (
                  <li key={c.label}>
                    <SiteLink href={c.href} className={COLUMN_LINK}>
                      {c.label}
                      <ArrowUpRight
                        size={12}
                        strokeWidth={2}
                        className="text-bone/25 transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-soft"
                      />
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col-reverse items-start gap-4 border-t border-bone/10 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] tracking-[0.04em] text-bone/35">
            © {year} Masachi DC. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => scrollToTarget('')}
            className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-bone/45 transition-colors duration-300 hover:text-bone"
          >
            Back to top
            <ArrowUp size={12} strokeWidth={2} className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
