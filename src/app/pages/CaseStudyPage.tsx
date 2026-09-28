import { useEffect, useMemo, type ReactNode } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { SectionRail, type RailSection } from '../components/SectionRail';
import { ProjectRail } from '../components/ProjectRail';
import { CASE_ACCENT, FRAME_BG } from '../components/caseStudy';
import { findCaseStudy, type CaseBlock, type CaseImage, type CaseStudy } from '../data/caseStudies';
import { easeOut, fadeUp, viewportOnce } from '../lib/motion';

// Generous side gutters: content sits well inside the viewport.
const SHELL = 'mx-auto w-full max-w-[1280px] px-6 sm:px-12 md:px-20 lg:px-32 xl:px-40';

// ── Layout primitives ───────────────────────────────────────────────────────

/** Section eyebrow: bold and muted, nearly title-sized (Phoebe-style). */
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-1 font-display text-[20px] font-bold leading-[1.2] text-ink/30 sm:text-[22px]">{children}</p>
  );
}

function ContentBlock({
  id,
  subtitle,
  title,
  children,
  wide = false,
}: {
  id: string;
  subtitle: string;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      className={`${SHELL} py-16 md:py-24`}
    >
      <div className={`grid grid-cols-1 gap-6 ${wide ? 'md:grid-cols-[5fr_7fr]' : 'md:grid-cols-[2fr_3fr]'} md:gap-16`}>
        {/* Two-tone label: bold muted eyebrow over a bold dark title */}
        <motion.div variants={fadeUp}>
          <Eyebrow>{subtitle}</Eyebrow>
          <h2 className="font-display text-[28px] font-bold leading-[1.15] tracking-[-0.01em] text-ink/80 sm:text-[32px]">{title}</h2>
        </motion.div>
        <motion.div variants={fadeUp} className="max-w-[58ch] space-y-5 text-[18px] leading-[1.7] text-ink/55">
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
}

/** Full-width light-grey frame that holds images with breathing room. */
function Frame({ children, caption }: { children: ReactNode; caption?: string }) {
  return (
    <motion.figure
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={fadeUp}
      className="w-full px-6 py-16 sm:px-12 md:px-20 md:py-24 lg:px-32"
      style={{ backgroundColor: FRAME_BG }}
    >
      <div className="mx-auto w-full max-w-[960px]">{children}</div>
      {caption && (
        <figcaption className="mx-auto mt-6 max-w-[960px] text-center text-[13px] text-ink/40">{caption}</figcaption>
      )}
    </motion.figure>
  );
}

function FramedImage({ src, alt, ratio = '16/9' }: CaseImage & { ratio?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="w-full rounded-[6px] object-cover shadow-[0_20px_50px_-20px_rgba(10,10,11,0.25)]"
      style={{ aspectRatio: ratio }}
    />
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-2">
      <span
        className="font-display text-[48px] font-extrabold leading-none tracking-[-0.02em] sm:text-[60px]"
        style={{ color: CASE_ACCENT }}
      >
        {value}
      </span>
      <span className="text-[13px] text-ink/45">{label}</span>
    </motion.div>
  );
}

function Block({ block }: { block: CaseBlock }) {
  switch (block.kind) {
    case 'content':
      return (
        <ContentBlock id={block.id} subtitle={block.subtitle} title={block.title} wide={block.wide}>
          {block.body}
        </ContentBlock>
      );
    case 'frame':
      return (
        <Frame caption={block.caption}>
          {block.images.length === 1 ? (
            <FramedImage {...block.images[0]} />
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {block.images.map((img, i) => (
                <FramedImage key={`${img.src}-${i}`} {...img} ratio="4/3" />
              ))}
            </div>
          )}
        </Frame>
      );
    case 'stats':
      return (
        <motion.section
          id={block.id}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className={`${SHELL} py-16 md:py-24`}
        >
          <motion.div variants={fadeUp} className="mb-12">
            <Eyebrow>{block.label}</Eyebrow>
          </motion.div>
          <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
            {block.items.map((s, i) => (
              <Stat key={`${s.label}-${i}`} value={s.value} label={s.label} />
            ))}
          </div>
        </motion.section>
      );
  }
}

// ── Page ────────────────────────────────────────────────────────────────────

function CaseStudyView({ study }: { study: CaseStudy }) {
  // Moving between case studies reuses this component; start each at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [study.slug]);

  const sections = useMemo<RailSection[]>(
    () =>
      study.blocks.flatMap((b) =>
        b.kind === 'content' ? [{ id: b.id, title: b.subtitle }] : b.kind === 'stats' ? [{ id: b.id, title: b.label }] : [],
      ),
    [study],
  );

  return (
    <div className="relative flex min-h-screen flex-col bg-bone font-sans">
      <Nav />
      <SectionRail sections={sections} />
      <ProjectRail currentId={study.projectId} />

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className={`${SHELL} pb-16 pt-14 lg:pt-20`}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <Link
              to="/#work"
              className="mb-10 inline-flex items-center gap-2 text-[13px] text-ink/40 transition-colors hover:text-ink"
            >
              <ArrowLeft size={14} strokeWidth={2} />
              Back to work
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-[3fr_2fr] md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}
            >
              <p className="mb-3 text-[14px] text-ink/40">{study.disciplines}</p>
              <h1 className="font-display text-[52px] font-extrabold leading-[0.96] tracking-[-0.02em] text-ink sm:text-[68px] lg:text-[80px]">
                {study.title.map((line, i) => (
                  <span key={line} className="block">
                    {line}
                    {i < study.title.length - 1 && ' '}
                  </span>
                ))}
              </h1>
              <p className="mt-6 max-w-[46ch] text-[17px] leading-[1.7] text-ink/55">{study.subtitle}</p>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOut, delay: 0.25 }}
              className="grid grid-cols-2 content-end gap-x-8 gap-y-7 pb-2"
            >
              {study.meta.map(([label, value]) => (
                <div key={label}>
                  <dt className="mb-1.5 text-[14px] font-semibold text-ink">{label}</dt>
                  <dd className="text-[14px] leading-[1.6] text-ink/55">{value}</dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </section>

        {/* ── Hero image ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: easeOut, delay: 0.3 }}
        >
          <Frame>
            <FramedImage {...study.hero} />
          </Frame>
        </motion.div>

        {/* ── Overview ── */}
        <div className={`${SHELL} py-16 md:py-24`}>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="max-w-[44ch] text-pretty text-[24px] font-normal leading-[1.45] tracking-[-0.01em] text-ink/60 sm:text-[28px] lg:text-[30px]"
          >
            {study.overview}
          </motion.p>
        </div>

        {study.blocks.map((block, i) => (
          <Block key={`${study.slug}-${i}`} block={block} />
        ))}

        {/* ── Closing ── */}
        <div className={`${SHELL} py-20`}>
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 text-[13px] text-ink/40 transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back to all work
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export function CaseStudyPage() {
  const { slug } = useParams();
  const study = findCaseStudy(slug);
  if (!study) return <Navigate to="/" replace />;
  // Keyed by slug so scroll-triggered reveals replay for each study.
  return <CaseStudyView key={study.slug} study={study} />;
}
