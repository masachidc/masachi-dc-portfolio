import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { ContactSection } from '../components/ContactSection';
import { SiteLink } from '../components/SiteLink';
import { fadeUp, viewportOnce } from '../lib/motion';
import { IMPACT } from '../data/profile';
import { PAGE_META } from '../data/pageMeta';
import { isExternal } from '../data/site';

export function ImpactPage() {
  return (
    <PageLayout
      meta={PAGE_META.impact}
      kicker="Impact"
      title="What the work changed."
      lede="Products shipped, programs run, and people reached. Where I was one contributor among many, I say so."
    >
      <section aria-label="Outcomes" className="container-site pb-(--space-section)">
        <ol className="border-t border-line">
          {IMPACT.map((item, i) => (
            <motion.li
              key={item.subject}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              className="grid grid-cols-1 gap-4 border-b border-line py-10 md:grid-cols-[4fr_8fr] md:gap-16 md:py-14"
            >
              <div>
                <p className="font-mono text-micro text-accent-deep">0{i + 1}</p>
                <h2 className="mt-3 max-w-[16ch] font-display text-title text-ink">{item.headline}</h2>
              </div>
              <div className="max-w-(--measure)">
                <p className="text-label caps text-fg-subtle">{item.subject}</p>
                <p className="mt-3 text-body-lg text-fg-muted">{item.context}</p>
                <p className="mt-4 text-body text-ink">
                  <span className="font-semibold">My role: </span>
                  {item.role}
                </p>
                {item.link && (
                  <SiteLink
                    href={item.link.href}
                    className="group mt-5 inline-flex items-center gap-1.5 py-1 text-label caps text-accent-deep"
                  >
                    {item.link.label}
                    {isExternal(item.link.href) ? (
                      <ArrowUpRight size={12} strokeWidth={2} aria-hidden />
                    ) : (
                      <ArrowRight size={12} strokeWidth={2} aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                    )}
                  </SiteLink>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </section>

      <ContactSection />
    </PageLayout>
  );
}
