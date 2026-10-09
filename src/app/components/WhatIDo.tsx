import { useEffect, useId, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Minus, Plus } from 'lucide-react';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';

const CAPABILITIES = [
  {
    title: 'Product Design',
    description: 'I can define what to build, when to build, why it matters and how the product experience should feel.',
  },
  {
    title: 'Design Engineering',
    description: 'I carry designs into working software, owning technical decisions and implementation, with AI-assisted development.',
  },
  {
    title: 'Visual Design',
    description: 'I have developed aesthetic sensibility and can establish the visual direction across product and brand.',
  },
  {
    title: 'Systems Thinking',
    description: 'I connect the bigger picture to the details, making decisions with longevity, scale, and depth in mind.',
  },
  {
    title: 'Shipping',
    description: 'I take products from concept to release, owning the process, quality, and final outcome.',
  },
] as const;

/** One open at a time. Product Design starts open; clicking the open row closes it. */
const INITIAL_OPEN = 'Product Design';

/**
 * Single-open accordion. The trigger is the heading row (WAI-ARIA APG): a button inside an h3, with
 * aria-expanded / aria-controls. The panel stays mounted so aria-controls always resolves. Height uses a
 * grid-rows transition; closing sets `inert` so the description leaves the tab order and the accessibility tree.
 * Bottom padding sits on the trigger while closed and moves onto the panel while open, so the title-to-copy
 * gap stays the original mt-1 and the row doesn't jump.
 */
function Capability({
  title,
  description,
  open,
  onToggle,
  triggerId,
  panelId,
  isFirst,
  isLast,
}: {
  title: string;
  description: string;
  open: boolean;
  onToggle: () => void;
  triggerId: string;
  panelId: string;
  isFirst: boolean;
  isLast: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (panelRef.current) panelRef.current.inert = !open;
  }, [open]);

  return (
    <motion.li variants={fadeUp} className="group/row">
      <h3>
        <button
          id={triggerId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className={`flex w-full items-center justify-between gap-4 pr-4 text-left transition-[padding-bottom] duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:pr-5 ${
            isFirst ? 'pt-0' : 'pt-6 sm:pt-7'
          } ${open || isLast ? 'pb-0' : 'pb-6 sm:pb-7'}`}
        >
          <span
            className={`min-w-0 text-entry transition-colors duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
              open ? 'text-ink' : 'text-fg-muted'
            }`}
          >
            {title}
          </span>
          <span
            aria-hidden="true"
            className={`flex size-11 shrink-0 items-center justify-center rounded-full border transition-[color,background-color,border-color,transform] duration-300 ease-out group-active/row:scale-[0.96] motion-reduce:transition-none ${
              open
                ? 'border-fg-muted bg-fg-muted text-bone'
                : 'border-line bg-paper text-ink group-hover/row:border-ink/25 group-hover/row:bg-surface group-focus-within/row:border-ink/25 group-focus-within/row:bg-surface'
            }`}
          >
            {open ? <Minus size={18} strokeWidth={1.8} /> : <Plus size={18} strokeWidth={1.8} />}
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={open ? undefined : true}
        className={`grid transition-[grid-template-rows,opacity] duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div ref={panelRef} className="min-h-0 overflow-hidden">
          <p className={`mt-1 max-w-(--measure) text-body-lg text-fg-muted ${isLast ? '' : 'pb-6 sm:pb-7'}`}>
            {description}
          </p>
        </div>
      </div>
    </motion.li>
  );
}

/** Homepage overview of Nathan's end-to-end product practice. */
export function WhatIDo() {
  const [openTitle, setOpenTitle] = useState<string | null>(INITIAL_OPEN);
  const baseId = useId();

  return (
    <motion.section
      aria-labelledby="what-i-do-title"
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={stagger(0, 0.08)}
      className="container-site section-y"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div variants={fadeUp}>
          <p className="mb-3 font-display text-kicker text-fg-faint">What I can do</p>
          <h2 id="what-i-do-title" className="max-w-[15ch] text-balance font-display text-headline text-ink">
            From the first decision to the final release.
          </h2>
        </motion.div>

        <ul className="divide-y divide-line">
          {CAPABILITIES.map(({ title, description }, index) => (
            <Capability
              key={title}
              title={title}
              description={description}
              open={openTitle === title}
              onToggle={() => setOpenTitle((current) => (current === title ? null : title))}
              triggerId={`${baseId}-trigger-${index}`}
              panelId={`${baseId}-panel-${index}`}
              isFirst={index === 0}
              isLast={index === CAPABILITIES.length - 1}
            />
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
