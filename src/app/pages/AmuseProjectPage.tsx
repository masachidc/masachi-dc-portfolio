import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { SectionRail, type RailSection } from '../components/SectionRail';
import { ProjectRail } from '../components/ProjectRail';
import { easeOut, fadeUp, viewportOnce } from '../lib/motion';

const ACCENT = '#008C95';
const FRAME_BG = '#f3f3f1';

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1600&q=80&auto=format&fit=crop',
  research: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&q=80&auto=format&fit=crop',
  mobile: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80&auto=format&fit=crop',
  sketches: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=900&q=80&auto=format&fit=crop',
  gallery: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1600&q=80&auto=format&fit=crop',
  testing: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1600&q=80&auto=format&fit=crop',
  museum2: 'https://images.unsplash.com/photo-1563381408015-842cbe575d06?w=900&q=80&auto=format&fit=crop',
};

// Generous side gutters: content sits well inside the viewport.
const SHELL = 'mx-auto w-full max-w-[1280px] px-6 sm:px-12 md:px-20 lg:px-32 xl:px-40';

// ── Layout primitives ───────────────────────────────────────────────────────

/** Bold-black emphasis inside grey body copy. */
function Hl({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-ink">{children}</strong>;
}

/** Rail entries — each id matches a section below. */
const SECTIONS: RailSection[] = [
  { id: 'challenge', title: 'Challenge' },
  { id: 'research', title: 'Research' },
  { id: 'pivot', title: 'Product Pivot' },
  { id: 'design', title: 'Design' },
  { id: 'testing', title: 'Usability Testing' },
  { id: 'vision', title: 'Vision' },
  { id: 'accessibility', title: 'Accessibility' },
  { id: 'outcome', title: 'Outcome' },
  { id: 'reflection', title: 'Reflection' },
];

/** Section eyebrow: bold and muted, nearly title-sized (Phoebe-style). */
function Eyebrow({ children }: { children: React.ReactNode }) {
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
  children: React.ReactNode;
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
function Frame({ children, caption }: { children: React.ReactNode; caption?: string }) {
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

function FramedImage({ src, alt, ratio = '16/9' }: { src: string; alt: string; ratio?: string }) {
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
        style={{ color: ACCENT }}
      >
        {value}
      </span>
      <span className="text-[13px] text-ink/45">{label}</span>
    </motion.div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export function AmuseProjectPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-bone font-sans">
      <Nav />
      <SectionRail sections={SECTIONS} />
      <ProjectRail currentId="02" />

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className={`${SHELL} pb-16 pt-14 lg:pt-20`}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <Link
              to="/"
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
              <p className="mb-3 text-[14px] text-ink/40">
                Product Design · UX Research · Interaction Design
              </p>
              <h1 className="font-display text-[52px] font-extrabold leading-[0.96] tracking-[-0.02em] text-ink sm:text-[68px] lg:text-[80px]">
                AMUSE<br />Art Museum
              </h1>
              <p className="mt-6 max-w-[46ch] text-[17px] leading-[1.7] text-ink/55">
                Making contemporary art easier to discover, plan, and experience in Kenya.
              </p>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOut, delay: 0.25 }}
              className="grid grid-cols-2 content-end gap-x-8 gap-y-7 pb-2"
            >
              {[
                ['Timeline', '11 weeks · 2025'],
                ['Role', 'Lead Product Designer'],
                ['Scope', 'Research, Strategy, IA, UI, Prototyping'],
                ['Platform', 'Mobile-first PWA'],
              ].map(([label, value]) => (
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
            <FramedImage src={IMAGES.hero} alt="Gallery interior — white walls, framed art" />
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
            AMUSE is a mobile-first museum platform designed to connect the fragmented journey between{' '}
            <Hl>discovering an exhibition and actually visiting it</Hl>. I led the experience from research and product
            strategy through interaction design, prototyping, usability testing, and the final design system.
          </motion.p>
        </div>

        {/* ── The Challenge ── */}
        <ContentBlock id="challenge" subtitle="Challenge" title="How might we make the journey from discovering art to visiting it feel continuous?">
          <p>
            People were discovering exhibitions through platforms like Instagram and TikTok, but planning a visit was much harder. Research surfaced four recurring problems — all of which broke down the moment someone tried to act on their interest.
          </p>
          <ul className="space-y-3">
            {[
              'Pricing and exhibition details were difficult to find',
              'Museum websites often performed poorly on mobile',
              'Booking and discovery happened across disconnected platforms',
              'Digital payment options did not reflect Kenya\'s mobile-money-first behavior',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-[11px] h-1 w-4 shrink-0" style={{ backgroundColor: ACCENT }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>The opportunity was bigger than redesigning a museum website.</p>
        </ContentBlock>

        {/* ── Research image ── */}
        <Frame caption="Field research · Nairobi, Kenya">
          <FramedImage src={IMAGES.research} alt="Research session with participants" />
        </Frame>

        {/* ── Understanding the journey ── */}
        <ContentBlock id="research" subtitle="Research" title="Understanding the journey">
          <p>
            I interviewed and surveyed potential visitors to understand how they discovered exhibitions, planned visits, and decided whether to go.
          </p>
          <p>
            The biggest insight was that discovery was not the problem. <Hl>Conversion was.</Hl>
          </p>
          <p>
            People could find interesting exhibitions, but the experience broke down when they needed practical information — price, location, availability, accessibility, or a way to book. That shifted the product from an online museum showcase into a tool for <Hl>discovery, planning, and booking</Hl>.
          </p>
        </ContentBlock>

        {/* ── Pivot ── */}
        <ContentBlock id="pivot" subtitle="Product Pivot" title="A product decision changed the direction" wide>
          <p>
            My initial concept included a dedicated museum app. Competitive research challenged that assumption. Dedicated museum apps showed weak adoption and high abandonment, while the target experience needed to work across devices with minimal friction.
          </p>
          <p>
            Kenya's mobile-first environment added another constraint: the product needed to remain lightweight and accessible without requiring users to install another application. I moved toward a <Hl>responsive, PWA-style platform</Hl> instead.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              'No required app download',
              'One experience across mobile and desktop',
              'M-Pesa payment within the booking flow',
              'Architecture that could support multiple museums',
            ].map((item) => (
              <div key={item} className="rounded-[6px] p-4" style={{ backgroundColor: FRAME_BG }}>
                <p className="text-[16px] leading-snug text-ink/70">{item}</p>
              </div>
            ))}
          </div>
        </ContentBlock>

        {/* ── Image grid ── */}
        <Frame>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <FramedImage src={IMAGES.sketches} alt="Early wireframe sketches" ratio="4/3" />
            <FramedImage src={IMAGES.mobile} alt="Mobile prototype" ratio="4/3" />
            <FramedImage src={IMAGES.museum2} alt="Museum floor plan reference" ratio="4/3" />
          </div>
        </Frame>

        {/* ── Core experience ── */}
        <ContentBlock id="design" subtitle="Design" title="Designing the core experience">
          <p>I centered the product around three jobs to be done:</p>
          <div className="space-y-6 pt-2">
            {[
              { label: 'Discover', body: 'Find museums, exhibitions, and events through search and browsing.' },
              { label: 'Plan', body: 'See the information needed to confidently make a visit: dates, pricing, location, accessibility, and exhibition details.' },
              { label: 'Book', body: 'Choose a visit and complete payment without leaving the experience.' },
            ].map(({ label, body }) => (
              <div key={label} className="border-l-2 pl-5" style={{ borderColor: ACCENT }}>
                <p className="mb-1 font-semibold text-ink">{label}</p>
                <p>{body}</p>
              </div>
            ))}
          </div>
          <p>
            I initially explored a highly visual "digital wall of art" with skeuomorphic and split-screen interactions. It looked distinctive, but introduced unnecessary cognitive load and translated poorly to smaller screens. I removed it.
          </p>
        </ContentBlock>

        {/* ── Gallery image ── */}
        <Frame caption="Final concept — Discovery screen">
          <FramedImage src={IMAGES.gallery} alt="Final app design — discovery screen" />
        </Frame>

        {/* ── Testing ── */}
        <ContentBlock id="testing" subtitle="Usability Testing" title="Testing changed the product">
          <p>I tested the prototype with five participants across Kenya and the United States. Three behaviors stood out.</p>
          <div className="space-y-8 pt-2">
            {[
              {
                label: 'Search needed to be global.',
                body: 'Participants instinctively looked for search first, so I elevated it into a persistent discovery tool with filters.',
              },
              {
                label: 'Important destinations needed persistent navigation.',
                body: 'Participants missed Events when it sat lower in the page hierarchy. I redesigned mobile navigation to give major destinations direct access.',
              },
              {
                label: 'The unexpected feature generated the strongest engagement.',
                body: 'My Museum — a personal space where visitors could save experiences and reflect on art — was explored by every participant without prompting. That signal changed the feature from an experiment into a core part of the concept.',
              },
            ].map(({ label, body }) => (
              <div key={label}>
                <p className="mb-2 font-semibold text-ink">{label}</p>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </ContentBlock>

        {/* ── Testing image ── */}
        <Frame caption="Affinity mapping · Post-test synthesis">
          <FramedImage src={IMAGES.testing} alt="Team synthesis session" />
        </Frame>

        {/* ── Beyond the transaction ── */}
        <ContentBlock id="vision" subtitle="Vision" title="Designing beyond the transaction">
          <p>Museums are not only places people purchase tickets to. They are places people remember.</p>
          <p>
            That insight shaped <Hl>My Museum</Hl> into a layer that extends the experience beyond booking — visitors can preserve exhibitions, artworks, and reflections as part of their personal relationship with art.
          </p>
          <p>
            I also explored <Hl>Art, But With You</Hl>, a participatory concept that allows visitors to contribute to a shared physical artwork. Together, these ideas moved AMUSE from a booking utility toward a platform connecting the experience before, during, and after a museum visit.
          </p>
        </ContentBlock>

        {/* ── Accessibility ── */}
        <ContentBlock id="accessibility" subtitle="Accessibility" title="Accessibility by design">
          <p>
            Accessibility influenced both the digital product and the information architecture. The interface was designed around accessible contrast, scalable typography, screen-reader considerations, and clear interaction states.
          </p>
          <p>
            Museum pages also surface physical accessibility information so visitors can understand whether a venue meets their needs before making the trip. Accessibility became part of planning the experience, rather than a setting users had to discover later.
          </p>
        </ContentBlock>

        {/* ── Outcome stats ── */}
        <motion.section
          id="outcome"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className={`${SHELL} py-16 md:py-24`}
        >
          <motion.div variants={fadeUp} className="mb-12">
            <Eyebrow>Outcome</Eyebrow>
          </motion.div>
          <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
            <Stat value="5" label="Usability participants" />
            <Stat value="3" label="Major pivots driven by evidence" />
            <Stat value="11wk" label="End-to-end design sprint" />
            <Stat value="1" label="Unified cross-device experience" />
          </div>
        </motion.section>

        {/* ── Learnings ── */}
        <ContentBlock id="reflection" subtitle="Reflection" title="What AMUSE taught me">
          <p>AMUSE taught me that good product design is not about defending the first concept. It is about finding the strongest evidence for what the product should become.</p>
          <div className="space-y-6 pt-2">
            {[
              { label: 'Research changed the problem.', body: 'The opportunity shifted from showcasing museums to connecting discovery with visitation.' },
              { label: 'Market constraints changed the platform.', body: 'I moved away from a dedicated native app toward a lightweight cross-device experience.' },
              { label: 'Testing changed the interface.', body: 'Search and navigation became more prominent based on observed behavior.' },
              { label: 'User behavior changed the roadmap.', body: 'Unexpected engagement with My Museum elevated retention and reflection into a larger product opportunity.' },
            ].map(({ label, body }) => (
              <div key={label}>
                <p className="mb-2 font-semibold text-ink">{label}</p>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </ContentBlock>

        {/* ── Closing ── */}
        <div className={`${SHELL} py-20`}>
          <Link
            to="/"
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
