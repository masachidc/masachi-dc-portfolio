import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { CONTACT_LINKS, NAV_LINKS } from '../data/site';
import { SiteLink, scrollToTarget } from './SiteLink';
import { Wordmark } from './Wordmark';

// On the near-black footer: bone/70 ≈ 11:1, bone/60 ≈ 8:1 — all AA.
const COLUMN_TITLE = 'mb-5 text-micro caps text-bone/60';
const COLUMN_LINK =
  'group inline-flex items-center gap-1.5 py-1 text-small font-medium text-bone/70 transition-colors duration-300 hover:text-bone';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-deep text-bone">
      <div className="container-site">
        {/* ── Top: identity + link columns ── */}
        <div className="grid grid-cols-1 gap-14 py-16 md:grid-cols-[1fr_auto] md:gap-24 md:py-20">
          <div className="flex flex-col gap-5">
            <Wordmark tone="light" />
            <p className="max-w-[32ch] text-body text-bone/70">A product designer who ships.</p>
          </div>

          <div className="grid grid-cols-2 gap-16 sm:gap-24">
            <nav aria-labelledby="footer-nav-title">
              <h2 id="footer-nav-title" className={COLUMN_TITLE}>Navigate</h2>
              <ul className="flex flex-col gap-2.5">
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
              <h2 className={COLUMN_TITLE}>Connect</h2>
              <ul className="flex flex-col gap-2.5">
                {CONTACT_LINKS.map((c) => (
                  <li key={c.label}>
                    <SiteLink href={c.href} className={COLUMN_LINK}>
                      {c.label}
                      <ArrowUpRight
                        size={12}
                        strokeWidth={2}
                        aria-hidden
                        className="text-bone/40 transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-soft"
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
          <p className="text-small text-bone/60">© {year} Masachi DC. All rights reserved.</p>
          <button
            type="button"
            onClick={() => scrollToTarget('')}
            className="group inline-flex items-center gap-2 py-2 text-micro caps text-bone/60 transition-colors duration-300 hover:text-bone"
          >
            Back to top
            <ArrowUp size={12} strokeWidth={2} aria-hidden className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
