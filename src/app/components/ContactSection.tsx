import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { EMAIL, SOCIAL_LINKS } from '../data/site';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';
import { SiteLink } from './SiteLink';

const LINKEDIN = SOCIAL_LINKS.find((s) => s.label === 'LinkedIn')!;

/**
 * The next step after the work. Written for recruiters and hiring managers
 * first, founders second; email is the primary action.
 */
export function ContactSection() {
  return (
    <motion.section
      id="contact"
      aria-labelledby="contact-title"
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={stagger(0, 0.1)}
      className="container-site section-y border-t border-line"
    >
      <motion.p variants={fadeUp} className="mb-3 font-display text-kicker text-fg-faint">
        Get in touch
      </motion.p>
      <motion.h2 id="contact-title" variants={fadeUp} className="max-w-[20ch] font-display text-headline text-ink">
        Open to product design and design engineering roles.
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-6 max-w-[48ch] text-body-lg text-fg-muted">
        I'm also glad to hear from founders and teams building something new. Email is the fastest
        way to reach me.
      </motion.p>

      <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-baseline gap-x-10 gap-y-5">
        <SiteLink
          href={`mailto:${EMAIL}`}
          className="group inline-flex max-w-full items-center gap-3 font-display text-kicker text-ink underline [overflow-wrap:anywhere] min-[380px]:text-title decoration-line decoration-2 underline-offset-8 transition-colors hover:text-accent-deep hover:decoration-accent"
        >
          {EMAIL}
          <ArrowUpRight size={22} strokeWidth={2} aria-hidden className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </SiteLink>
        <SiteLink
          href={LINKEDIN.href}
          className="group inline-flex items-center gap-1.5 py-2 text-label caps text-fg-muted transition-colors hover:text-ink"
        >
          LinkedIn
          <ArrowUpRight size={12} strokeWidth={2} aria-hidden />
        </SiteLink>
      </motion.div>
    </motion.section>
  );
}
