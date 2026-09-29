import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { easeOut } from '../lib/motion';
import { ContactMenu } from './ContactMenu';
import { SiteLink } from './SiteLink';
import { Wordmark } from './Wordmark';
import { CONTACT_LINKS, NAV_LINKS, type NavItem } from '../data/site';

/** A nav item is current when its route is the page being viewed. Work also owns case studies. */
function useIsCurrent() {
  const { pathname } = useLocation();
  return (item: NavItem) => {
    const path = item.href.split('#')[0] || '/';
    if (item.href === '/#work') return pathname === '/' || pathname.startsWith('/works/');
    return pathname === path;
  };
}

function NavLink({ item, current }: { item: NavItem; current: boolean }) {
  return (
    <SiteLink
      href={item.href}
      ariaCurrent={current ? 'page' : undefined}
      className={`group relative py-2 text-label caps font-medium transition-colors duration-300 hover:text-ink ${
        current ? 'text-ink' : 'text-fg-muted'
      }`}
    >
      {item.label}
      <span
        className={`pointer-events-none absolute bottom-1 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100 ${
          current ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
    </SiteLink>
  );
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const isCurrent = useIsCurrent();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const diff = latest - lastY.current;
    if (latest < 96) {
      setHidden(false);
    } else if (diff > 4) {
      setHidden(true);
    } else if (diff < -4) {
      setHidden(false);
    }
    lastY.current = latest;
  });

  // Mobile menu: lock page scroll, move focus in, close on Escape and return focus to the toggle.
  useEffect(() => {
    if (!menuOpen) return;
    document.documentElement.style.overflow = 'hidden';
    menuRef.current?.querySelector<HTMLElement>('a')?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-ink focus:px-4 focus:py-3 focus:text-label focus:caps focus:text-bone"
      >
        Skip to content
      </a>

      <motion.header
        animate={{ y: hidden && !menuOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.5, ease: easeOut }}
        // Keyboard users tabbing into a hidden header should see it.
        onFocusCapture={() => setHidden(false)}
        className="sticky top-0 z-50 border-b border-line bg-bone/90 backdrop-blur-md"
      >
        <div className="container-site flex h-(--header-h) items-center justify-between">
          <Wordmark onNavigate={() => setMenuOpen(false)} />

          <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((item) => (
              <NavLink key={item.label} item={item} current={isCurrent(item)} />
            ))}
          </nav>

          <div className="hidden md:block">
            <ContactMenu />
          </div>

          <button
            ref={toggleRef}
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="-mr-2 flex h-11 w-11 items-center justify-center text-ink md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* rendered as a header sibling — backdrop-blur on <header> would otherwise
          establish a containing block and break this panel's position:fixed */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: easeOut }}
            // Right-aligned so every target sits in the thumb's reach; one row rhythm
            // (py-5, cap-trimmed type) keeps text optically centred between hairlines;
            // the header's bottom border is the first rule.
            className="fixed inset-x-0 top-(--header-h) bottom-0 z-40 flex flex-col overflow-y-auto bg-bone px-(--gutter) pb-[max(2.5rem,env(safe-area-inset-bottom))] text-right md:hidden"
          >
            <nav aria-label="Primary" className="flex flex-col divide-y divide-line border-b border-line">
              {NAV_LINKS.map((item) => {
                const current = isCurrent(item);
                return (
                  <SiteLink
                    key={item.label}
                    href={item.href}
                    ariaCurrent={current ? 'page' : undefined}
                    onNavigate={() => setMenuOpen(false)}
                    // inset ring: the first row touches the scroll edge, which would clip it
                    className="group block py-5 focus-visible:outline-offset-[-2px]"
                  >
                    <span
                      className={`block font-display text-title uppercase [text-box:trim-both_cap_alphabetic] transition-transform duration-300 ease-out group-active:-translate-x-1 ${
                        current ? 'text-accent-deep' : 'text-ink'
                      }`}
                    >
                      {item.label}
                    </span>
                  </SiteLink>
                );
              })}
            </nav>

            <section aria-labelledby="mobile-menu-contact" className="flex flex-col items-end">
              <h2
                id="mobile-menu-contact"
                className="py-5 font-display text-title uppercase text-ink [text-box:trim-both_cap_alphabetic]"
              >
                Get in touch
              </h2>
              <ul className="flex flex-col items-end">
                {CONTACT_LINKS.map((c) => (
                  <li key={c.label}>
                    <SiteLink
                      href={c.href}
                      onNavigate={() => setMenuOpen(false)}
                      className="flex min-h-11 items-center gap-2 text-label caps text-fg-muted transition-colors duration-300 active:text-ink"
                    >
                      {c.label}
                      {/* -mr-1 cancels the icon's inner padding so its stroke lines up with the titles */}
                      <ArrowUpRight size={13} strokeWidth={2} aria-hidden className="-mr-1" />
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
