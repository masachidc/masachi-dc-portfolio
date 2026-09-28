import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { easeOut } from '../lib/motion';
import { CONTACT_LINKS } from '../data/site';
import { Magnetic } from './Magnetic';
import { SiteLink } from './SiteLink';

/**
 * "Get in touch" disclosure: a button that reveals every contact channel.
 * Closes on Escape (returning focus to the button), outside click, focus
 * leaving the panel, or choosing a link.
 */
export function ContactMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="py-2"
      >
        <Magnetic strength={0.4} className="flex items-center gap-1.5 text-label caps text-ink">
          Get in touch
          <ChevronDown
            size={13}
            strokeWidth={2}
            aria-hidden
            className={`transition-transform duration-300 ease-out ${open ? 'rotate-180' : ''}`}
          />
        </Magnetic>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={panelId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: easeOut }}
            className="absolute right-0 top-full z-10 mt-3 w-48 border border-line bg-bone py-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
          >
            {CONTACT_LINKS.map((c) => (
              <li key={c.label}>
                <SiteLink
                  href={c.href}
                  onNavigate={() => setOpen(false)}
                  className="group flex items-center justify-between px-4 py-2.5 text-label caps text-fg-muted transition-colors duration-200 hover:text-ink"
                >
                  {c.label}
                  <ArrowUpRight
                    size={12}
                    strokeWidth={2}
                    aria-hidden
                    className="text-fg-faint transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </SiteLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
