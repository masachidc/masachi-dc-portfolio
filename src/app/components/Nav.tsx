import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { easeOut } from '../lib/motion';
import { Magnetic } from './Magnetic';

const NAV_LINKS = ['Work', 'Studio', 'Practice', 'Journal', 'Contact'];

function NavLink({ label }: { label: string }) {
  return (
    <a
      href="#"
      className="group relative text-[11px] font-medium uppercase tracking-[0.18em] text-ink/55 transition-colors duration-300 hover:text-ink"
    >
      {label}
      <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </a>
  );
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const { scrollY } = useScroll();

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
          <a href="#" className="flex items-center gap-2.5">
            <span className="block h-2 w-2 shrink-0 bg-accent" />
            <span className="font-display text-[17px] font-bold uppercase leading-none tracking-[-0.01em] text-ink">
              Masachi
            </span>
            <span className="text-[10px] font-semibold uppercase leading-none tracking-[0.32em] text-ink/35">
              DC
            </span>
          </a>

          <nav className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((l) => (
              <NavLink key={l} label={l} />
            ))}
          </nav>

          <a
            href="https://masachidc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-block"
          >
            <Magnetic strength={0.4} className="group flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
              View Portfolio
              <ArrowUpRight
                size={13}
                strokeWidth={2}
                className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Magnetic>
          </a>

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
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((l, i) => (
                <a
                  key={l}
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-baseline gap-3 border-b border-ink/10 py-4"
                >
                  <span className="font-mono text-[10px] font-medium text-accent">
                    0{i + 1}
                  </span>
                  <span className="font-display text-3xl font-bold uppercase leading-none tracking-[-0.01em] text-ink transition-transform duration-300 ease-out group-active:translate-x-1">
                    {l}
                  </span>
                </a>
              ))}
            </nav>
            <a
              href="https://masachidc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex w-fit items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/60"
            >
              View Portfolio <ArrowUpRight size={13} strokeWidth={2} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
