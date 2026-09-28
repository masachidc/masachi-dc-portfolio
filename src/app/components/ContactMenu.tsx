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
            className="absolute right-0 top-full z-10 mt-3 w-56 border border-line bg-paper p-1.5 shadow-[0_18px_48px_-12px_rgba(10,10,11,0.18)]"
          >
            {CONTACT_LINKS.map((c, i) => (
              // Email is the primary action; a hairline sets it apart from the socials.
              <li key={c.label} className={i === 1 ? 'mt-1.5 border-t border-line pt-1.5' : undefined}>
                <SiteLink
                  href={c.href}
                  onNavigate={() => setOpen(false)}
                  className="group flex min-h-11 items-center justify-between gap-6 px-3.5 text-label caps text-fg-muted outline-offset-[-2px] transition-colors duration-200 hover:bg-surface hover:text-ink focus-visible:bg-surface focus-visible:text-ink"
                >
                  {c.label}
                  <ArrowUpRight
                    size={13}
                    strokeWidth={2}
                    aria-hidden
                    className="shrink-0 text-fg-faint transition-[transform,color] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent group-focus-visible:text-accent"
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
