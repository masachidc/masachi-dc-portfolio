import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { ContactSection } from '../components/ContactSection';
import { SiteLink } from '../components/SiteLink';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';
import { PROFILE } from '../data/profile';

const PATH = [
  { stage: 'Drafting', text: "I've been designing since high school, where I learned drafting, assembly drawing, and design thinking." },
  { stage: 'Architecture', text: 'Architecture school deepened my sense of form, space, and order. It taught me to think in systems and build from first principles.' },
  { stage: 'Digital interactive media', text: 'Creative technology pulled me toward interaction. Digital media taught me to design intuitive, human-centered experiences.' },
  { stage: 'Computer science', text: 'A minor in computer science taught me to design with technical constraints in mind.' },
];

const PRINCIPLES = [
  {
    title: 'Structure before styling.',
    text: "On Project SEEDS I extended FIU's existing brand instead of inventing a new one. It earned approval faster and kept the trust students already had.",
    link: { label: 'Project SEEDS', href: '/works/project-seeds-branding' },
  },
  {
    title: 'Let evidence change the plan.',
    text: 'AMUSE began as a native app. Competitive research moved it to a lightweight web platform, and testing turned My Museum into a core feature.',
    link: { label: 'AMUSE', href: '/works/amuse-art-museum' },
  },
  {
    title: 'Design far enough to meet the code.',
    text: 'On KESHO I carried the design into the codebase and built the design system there, where real constraints like time zones and translation live.',
    link: { label: 'KESHO', href: '/works/kesho-app' },
  },
  {
    title: 'Design for whoever runs it next.',
    text: "STEM Xposure's curriculum had to work for 14 volunteer instructors. The SEEDS website had to work for non-technical staff after I graduated.",
    link: { label: 'STEM Xposure', href: '/works/stemxposure' },
  },
];

const BEYOND = [
  {
    title: 'STEM Xposure',
    text: 'Three years volunteering as lead instructor and curriculum designer, bringing architecture and design to 500+ high school students.',
  },
  {
    title: '2024 BBCB Summit',
    text: 'Helped plan and run a national summit at Hillsborough Community College that drew over 1,000 students. Recognized with a travel award.',
  },
  {
    title: 'Caplin News',
    text: "I write for the FIU School of Journalism's student publisher, on issues that affect Miami residents, from public transportation to community stories.",
    link: { label: 'Read my writing', href: 'https://caplinnews.fiu.edu/author/nathan-masachi/' },
  },
  {
    title: 'Girl Power Rocks',
    text: 'Website design, graphics, and b-roll for an award-winning documentary following girls aging out of foster care in Overtown, Miami.',
  },
];

/** Label column beside content, matching the case-study section layout. */
function Band({ id, kicker, title, children }: { id: string; kicker: string; title: string; children: ReactNode }) {
  return (
    <motion.section
      aria-labelledby={`${id}-title`}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={stagger(0, 0.1)}
      className="container-site section-y border-t border-line"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[4fr_8fr] md:gap-16">
        <motion.div variants={fadeUp}>
          <p className="mb-1 font-display text-kicker text-fg-faint">{kicker}</p>
          <h2 id={`${id}-title`} className="max-w-[16ch] font-display text-title text-ink">
            {title}
          </h2>
        </motion.div>
        <motion.div variants={fadeUp}>{children}</motion.div>
      </div>
    </motion.section>
  );
}

export function AboutPage() {
  return (
    <PageLayout
      meta={{
        title: 'About',
        description:
          'Nathan Masachi is a product designer and design engineer trained in architecture, digital interactive media, and computer science, based in Tampa, Florida.',
      }}
      kicker="About"
      title="I turn ambiguous ideas into clear, useful products."
      lede={
        <>
          I'm {PROFILE.name}, a designer trained in architecture, digital media, and computer science. I combine{' '}
          <strong className="font-semibold text-ink">systems thinking, product design, and technical fluency</strong>,
          and I take products from research into working code. I'm based in {PROFILE.location}.
        </>
      }
    >
      <Band id="background" kicker="Background" title="From drafting to working products">
        <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {PATH.map((p, i) => (
            <li key={p.stage} className="border-t border-line pt-5">
              <p className="font-mono text-micro text-accent-deep">0{i + 1}</p>
              <p className="mt-2 text-body-lg font-semibold text-ink">{p.stage}</p>
              <p className="mt-2 text-body text-fg-muted">{p.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-(--measure) text-body-lg text-fg-muted">
          <strong className="font-semibold text-ink">Today, the pieces work together.</strong> AI has closed much
          of the gap between design and build. I start in Claude Code and ship through Vercel, owning a product from first
          idea to release.
        </p>
      </Band>

      <Band id="how-i-work" kicker="How I work" title="Four habits, each from a real project">
        <ul className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <li key={p.title} className="border-t border-line pt-5">
              <p className="text-body-lg font-semibold text-ink">{p.title}</p>
              <p className="mt-2 text-body text-fg-muted">{p.text}</p>
              <SiteLink href={p.link.href} className="group mt-4 inline-flex items-center gap-1.5 py-1 text-label caps text-accent-deep">
                {p.link.label}
                <ArrowRight size={12} strokeWidth={2} aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
              </SiteLink>
            </li>
          ))}
        </ul>
      </Band>

      <Band id="beyond" kicker="Beyond product" title="Teaching, events, and writing">
        <ul className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
          {BEYOND.map((b) => (
            <li key={b.title} className="border-t border-line pt-5">
              <p className="text-body-lg font-semibold text-ink">{b.title}</p>
              <p className="mt-2 text-body text-fg-muted">{b.text}</p>
              {b.link && (
                <SiteLink href={b.link.href} className="group mt-4 inline-flex items-center gap-1.5 py-1 text-label caps text-accent-deep">
                  {b.link.label}
                  <ArrowUpRight size={12} strokeWidth={2} aria-hidden />
                </SiteLink>
              )}
            </li>
          ))}
        </ul>
        <nav aria-label="Continue" className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          {[
            { label: 'See the work', href: '/#work' },
            { label: 'Impact', href: '/impact' },
            { label: 'Resume', href: '/resume' },
          ].map((l) => (
            <SiteLink key={l.href} href={l.href} className="group inline-flex items-center gap-1.5 border-b border-ink pb-1 text-label caps text-ink">
              {l.label}
              <ArrowRight size={12} strokeWidth={2} aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
            </SiteLink>
          ))}
        </nav>
      </Band>

      <ContactSection />
    </PageLayout>
  );
}
