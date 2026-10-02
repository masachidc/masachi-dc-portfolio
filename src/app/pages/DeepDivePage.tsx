import { useEffect, useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { CaseBlocks, railSections, withIds } from '../components/CaseBlocks';
import { SectionRail } from '../components/SectionRail';
import { SiteLink } from '../components/SiteLink';
import { deepDiveHref } from '../components/caseStudy';
import { deepDivesFor, findCaseStudy, findDeepDive, type CaseStudy, type DeepDive } from '../data/caseStudies';
import { easeOut } from '../lib/motion';
import { usePageMeta } from '../lib/usePageMeta';
import { NotFoundPage } from './NotFoundPage';

// A deep dive: a long-form companion to one case study, rendered with the same block grammar.
// It follows its case study's status: while the study is a draft, the deep dive is only reachable with ?preview.

function DeepDiveView({ dive, study }: { dive: DeepDive; study: CaseStudy }) {
  const { search } = useLocation();
  const draft = study.status === 'draft';
  const review = draft || import.meta.env.DEV;
  const studyHref = `/works/${study.slug}`;
  const studyName = study.title.join(' ');

  usePageMeta({ title: `${dive.title} · ${studyName}`, description: dive.description, noindex: draft });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dive.slug]);

  const blocks = useMemo(() => withIds(dive.blocks), [dive]);
  const sections = useMemo(() => railSections(blocks), [blocks]);
  const others = deepDivesFor(study.slug).filter((d) => d.slug !== dive.slug);

  if (draft && !new URLSearchParams(search).has('preview')) return <NotFoundPage />;

  return (
    <div className="relative flex min-h-screen flex-col bg-bone font-sans">
      <Nav />
      {sections.length > 1 && <SectionRail sections={sections} />}

      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <article>
          <header className="container-reading pb-6 pt-14 lg:pt-20">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: easeOut }}>
              <Link to={studyHref} className="mb-10 inline-flex items-center gap-2 py-2 text-small text-fg-subtle transition-colors hover:text-ink">
                <ArrowLeft size={14} strokeWidth={2} aria-hidden />
                {studyName} case study
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}>
              <p className="mb-3 text-label caps text-accent-deep">Deep dive · {studyName}</p>
              <h1 className="max-w-[22ch] text-pretty font-display text-headline text-ink">{dive.title}</h1>
              <p className="mt-6 max-w-[44ch] text-pretty text-lede text-fg-muted">{dive.dek}</p>
            </motion.div>
          </header>

          <CaseBlocks blocks={blocks} keyPrefix={dive.slug} review={review} />
        </article>

        <nav aria-label="More from this case study" className="mt-(--space-section) border-t border-line">
          <div className="container-reading flex flex-col gap-10 py-16 sm:flex-row sm:items-start sm:justify-between md:py-20">
            <Link to={studyHref} className="inline-flex items-center gap-2 py-2 text-small text-fg-subtle transition-colors hover:text-ink">
              <ArrowLeft size={14} strokeWidth={2} aria-hidden />
              Back to the {studyName} case study
            </Link>
            {others.length > 0 && (
              <ul className="flex flex-col gap-8 sm:items-end sm:text-right">
                {others.map((d) => (
                  <li key={d.slug}>
                    <SiteLink href={deepDiveHref(d)} className="group flex flex-col items-start gap-2 sm:items-end">
                      <span className="text-micro caps text-fg-subtle">Deep dive</span>
                      <span className="inline-flex max-w-[24ch] items-center gap-3 text-pretty font-display text-kicker text-ink transition-colors group-hover:text-accent-deep">
                        {d.title}
                        <ArrowRight size={18} strokeWidth={2} aria-hidden className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                      </span>
                    </SiteLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>
      </main>

      <Footer />
    </div>
  );
}

export function DeepDivePage() {
  const { slug, article } = useParams();
  const found = findCaseStudy(slug);
  const dive = findDeepDive(slug, article);
  if (!found || !dive) return <NotFoundPage />;
  // Keyed so scroll-triggered reveals replay when moving between deep dives.
  return <DeepDiveView key={dive.slug} dive={dive} study={found.study} />;
}
