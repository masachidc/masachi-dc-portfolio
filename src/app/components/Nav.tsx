import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { easeOut } from '../lib/motion';
import { Magnetic } from './Magnetic';
import { SiteLink } from './SiteLink';
import { Wordmark } from './Wordmark';
import { CONTACT_LINKS, NAV_LINKS, type NavItem } from '../data/site';

function NavLink({ item }: { item: NavItem }) {
  return (
    <SiteLink
      href={item.href}
      className="group relative text-[11px] font-medium uppercase tracking-[0.18em] text-ink/55 transition-colors duration-300 hover:text-ink"
    >
      {item.label}
      <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </SiteLink>
  );
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const lastY = useRef(0);
  const contactRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    if (!contactOpen) return;
    function onPointerDown(e: PointerEvent) {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setContactOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setContactOpen(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [contactOpen]);

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

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !menuOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="sticky top-0 z-50 border-b border-ink/10 bg-bone/90 backdrop-blur-md"
      >
        <div className="mx-auto flex h-[72px] w-full max-w-[1320px] items-center justify-between px-6 sm:px-10 lg:px-16">
          <Wordmark onNavigate={() => setMenuOpen(false)} />

          <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </nav>

          <div ref={contactRef} className="relative hidden md:block">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={contactOpen}
              onClick={() => setContactOpen((v) => !v)}
            >
              <Magnetic strength={0.4} className="group flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
                Contact Me
                <ChevronDown
                  size={13}
                  strokeWidth={2}
                  className={`transition-transform duration-300 ease-out ${contactOpen ? 'rotate-180' : ''}`}
                />
              </Magnetic>
            </button>

            <AnimatePresence>
              {contactOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: easeOut }}
                  className="absolute right-0 top-full z-10 mt-3 w-44 border border-ink/10 bg-bone py-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
                >
                  {CONTACT_LINKS.map((c) => (
                    <SiteLink
                      key={c.label}
                      href={c.href}
                      onNavigate={() => setContactOpen(false)}
                      className="group flex items-center justify-between px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 transition-colors duration-200 hover:text-ink"
                    >
                      {c.label}
                      <ArrowUpRight
                        size={12}
                        strokeWidth={2}
                        className="text-ink/25 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      />
                    </SiteLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 items-center justify-center text-ink md:hidden"
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
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="fixed inset-x-0 top-[72px] bottom-0 z-40 flex flex-col justify-between overflow-y-auto bg-bone px-6 py-10 md:hidden"
          >
            <nav aria-label="Primary" className="flex flex-col gap-1">
              {NAV_LINKS.map((item, i) => (
                <SiteLink
                  key={item.label}
                  href={item.href}
                  onNavigate={() => setMenuOpen(false)}
                  className="group flex items-baseline gap-3 border-b border-ink/10 py-4"
                >
                  <span className="font-mono text-[10px] font-medium text-accent">0{i + 1}</span>
                  <span className="font-display text-3xl font-bold uppercase leading-none tracking-[-0.01em] text-ink transition-transform duration-300 ease-out group-active:translate-x-1">
                    {item.label}
                  </span>
                </SiteLink>
              ))}
            </nav>
            <div className="mt-10 flex flex-col gap-1">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/35">
                Contact Me
              </p>
              {CONTACT_LINKS.map((c) => (
                <SiteLink
                  key={c.label}
                  href={c.href}
                  onNavigate={() => setMenuOpen(false)}
                  className="flex w-fit items-center gap-1.5 py-1.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink/60"
                >
                  {c.label} <ArrowUpRight size={13} strokeWidth={2} />
                </SiteLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
