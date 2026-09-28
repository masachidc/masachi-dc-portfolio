import type { ReactNode } from 'react';
import { Bullets, Cards, Hl, Points } from '../components/caseStudy';
import { PROJECTS, findProject, type Project } from './projects';

export interface CaseImage {
  src: string;
  alt: string;
}

export type CaseBlock =
  /** Label column (eyebrow + title) beside body copy. Appears in the section rail. */
  | { kind: 'content'; id: string; subtitle: string; title: string; wide?: boolean; body: ReactNode }
  /** Images inside a full-width grey frame. One image = full width; several = grid. */
  | { kind: 'frame'; images: CaseImage[]; caption?: string }
  /** Big accent numbers. Appears in the section rail. */
  | { kind: 'stats'; id: string; label: string; items: { value: string; label: string }[] };

export interface CaseStudy {
  /** Same slug as the project: served at /works/<slug>. */
  slug: string;
  /**
   * Placeholder content. Drafts render normally (so navigation never dead-ends)
   * but are noindex and left out of the sitemap until real copy lands.
   */
  draft?: boolean;
  disciplines: string;
  /** Hero title, one entry per line. */
  title: string[];
  subtitle: string;
  meta: [string, string][];
  hero: CaseImage;
  overview: ReactNode;
  blocks: CaseBlock[];
}

const unsplash = (id: string, w = 1600) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

const STOCK = {
  research: unsplash('photo-1531482615713-2afd69097998'),
  testing: unsplash('photo-1517048676732-d65bc937f952'),
  mobile: unsplash('photo-1512941937669-90a1b58e7e9c', 900),
  sketches: unsplash('photo-1586281380349-632531db7ed4', 900),
};

// ── AMUSE (real content) ────────────────────────────────────────────────────

const AMUSE: CaseStudy = {
  slug: 'amuse-art-museum',
  disciplines: 'Product Design · UX Research · Interaction Design',
  title: ['AMUSE', 'Art Museum'],
  subtitle: 'Making contemporary art easier to discover, plan, and experience in Kenya.',
  meta: [
    ['Timeline', '11 weeks · 2025'],
    ['Role', 'Lead Product Designer'],
    ['Scope', 'Research, Strategy, IA, UI, Prototyping'],
    ['Platform', 'Mobile-first PWA'],
  ],
  hero: { src: unsplash('photo-1518998053901-5348d3961a04'), alt: 'Gallery interior — white walls, framed art' },
  overview: (
    <>
      AMUSE is a mobile-first museum platform designed to connect the fragmented journey between{' '}
      <Hl>discovering an exhibition and actually visiting it</Hl>. I led the experience from research and product
      strategy through interaction design, prototyping, usability testing, and the final design system.
    </>
  ),
  blocks: [
    {
      kind: 'content',
      id: 'challenge',
      subtitle: 'Challenge',
      title: 'How might we make the journey from discovering art to visiting it feel continuous?',
      body: (
        <>
          <p>
            People were discovering exhibitions through platforms like Instagram and TikTok, but planning a visit was much harder. Research surfaced four recurring problems — all of which broke down the moment someone tried to act on their interest.
          </p>
          <Bullets
            items={[
              'Pricing and exhibition details were difficult to find',
              'Museum websites often performed poorly on mobile',
              'Booking and discovery happened across disconnected platforms',
              "Digital payment options did not reflect Kenya's mobile-money-first behavior",
            ]}
          />
          <p>The opportunity was bigger than redesigning a museum website.</p>
        </>
      ),
    },
    { kind: 'frame', images: [{ src: STOCK.research, alt: 'Research session with participants' }], caption: 'Field research · Nairobi, Kenya' },
    {
      kind: 'content',
      id: 'research',
      subtitle: 'Research',
      title: 'Understanding the journey',
      body: (
        <>
          <p>
            I interviewed and surveyed potential visitors to understand how they discovered exhibitions, planned visits, and decided whether to go.
          </p>
          <p>
            The biggest insight was that discovery was not the problem. <Hl>Conversion was.</Hl>
          </p>
          <p>
            People could find interesting exhibitions, but the experience broke down when they needed practical information — price, location, availability, accessibility, or a way to book. That shifted the product from an online museum showcase into a tool for <Hl>discovery, planning, and booking</Hl>.
          </p>
        </>
      ),
    },
    {
      kind: 'content',
      id: 'pivot',
      subtitle: 'Product Pivot',
      title: 'A product decision changed the direction',
      wide: true,
      body: (
        <>
          <p>
            My initial concept included a dedicated museum app. Competitive research challenged that assumption. Dedicated museum apps showed weak adoption and high abandonment, while the target experience needed to work across devices with minimal friction.
          </p>
          <p>
            Kenya's mobile-first environment added another constraint: the product needed to remain lightweight and accessible without requiring users to install another application. I moved toward a <Hl>responsive, PWA-style platform</Hl> instead.
          </p>
          <Cards
            items={[
              'No required app download',
              'One experience across mobile and desktop',
              'M-Pesa payment within the booking flow',
              'Architecture that could support multiple museums',
            ]}
          />
        </>
      ),
    },
    {
      kind: 'frame',
      images: [
        { src: STOCK.sketches, alt: 'Early wireframe sketches' },
        { src: STOCK.mobile, alt: 'Mobile prototype' },
        { src: unsplash('photo-1563381408015-842cbe575d06', 900), alt: 'Museum floor plan reference' },
      ],
    },
    {
      kind: 'content',
      id: 'design',
      subtitle: 'Design',
      title: 'Designing the core experience',
      body: (
        <>
          <p>I centered the product around three jobs to be done:</p>
          <Points
            bar
            items={[
              { label: 'Discover', body: 'Find museums, exhibitions, and events through search and browsing.' },
              { label: 'Plan', body: 'See the information needed to confidently make a visit: dates, pricing, location, accessibility, and exhibition details.' },
              { label: 'Book', body: 'Choose a visit and complete payment without leaving the experience.' },
            ]}
          />
          <p>
            I initially explored a highly visual "digital wall of art" with skeuomorphic and split-screen interactions. It looked distinctive, but introduced unnecessary cognitive load and translated poorly to smaller screens. I removed it.
          </p>
        </>
      ),
    },
    { kind: 'frame', images: [{ src: unsplash('photo-1541961017774-22349e4a1262'), alt: 'Final app design — discovery screen' }], caption: 'Final concept — Discovery screen' },
    {
      kind: 'content',
      id: 'testing',
      subtitle: 'Usability Testing',
      title: 'Testing changed the product',
      body: (
        <>
          <p>I tested the prototype with five participants across Kenya and the United States. Three behaviors stood out.</p>
          <Points
            items={[
              { label: 'Search needed to be global.', body: 'Participants instinctively looked for search first, so I elevated it into a persistent discovery tool with filters.' },
              { label: 'Important destinations needed persistent navigation.', body: 'Participants missed Events when it sat lower in the page hierarchy. I redesigned mobile navigation to give major destinations direct access.' },
              { label: 'The unexpected feature generated the strongest engagement.', body: 'My Museum — a personal space where visitors could save experiences and reflect on art — was explored by every participant without prompting. That signal changed the feature from an experiment into a core part of the concept.' },
            ]}
          />
        </>
      ),
    },
    { kind: 'frame', images: [{ src: STOCK.testing, alt: 'Team synthesis session' }], caption: 'Affinity mapping · Post-test synthesis' },
    {
      kind: 'content',
      id: 'vision',
      subtitle: 'Vision',
      title: 'Designing beyond the transaction',
      body: (
        <>
          <p>Museums are not only places people purchase tickets to. They are places people remember.</p>
          <p>
            That insight shaped <Hl>My Museum</Hl> into a layer that extends the experience beyond booking — visitors can preserve exhibitions, artworks, and reflections as part of their personal relationship with art.
          </p>
          <p>
            I also explored <Hl>Art, But With You</Hl>, a participatory concept that allows visitors to contribute to a shared physical artwork. Together, these ideas moved AMUSE from a booking utility toward a platform connecting the experience before, during, and after a museum visit.
          </p>
        </>
      ),
    },
    {
      kind: 'content',
      id: 'accessibility',
      subtitle: 'Accessibility',
      title: 'Accessibility by design',
      body: (
        <>
          <p>
            Accessibility influenced both the digital product and the information architecture. The interface was designed around accessible contrast, scalable typography, screen-reader considerations, and clear interaction states.
          </p>
          <p>
            Museum pages also surface physical accessibility information so visitors can understand whether a venue meets their needs before making the trip. Accessibility became part of planning the experience, rather than a setting users had to discover later.
          </p>
        </>
      ),
    },
    {
      kind: 'stats',
      id: 'outcome',
      label: 'Outcome',
      items: [
        { value: '5', label: 'Usability participants' },
        { value: '3', label: 'Major pivots driven by evidence' },
        { value: '11wk', label: 'End-to-end design sprint' },
        { value: '1', label: 'Unified cross-device experience' },
      ],
    },
    {
      kind: 'content',
      id: 'reflection',
      subtitle: 'Reflection',
      title: 'What AMUSE taught me',
      body: (
        <>
          <p>AMUSE taught me that good product design is not about defending the first concept. It is about finding the strongest evidence for what the product should become.</p>
          <Points
            items={[
              { label: 'Research changed the problem.', body: 'The opportunity shifted from showcasing museums to connecting discovery with visitation.' },
              { label: 'Market constraints changed the platform.', body: 'I moved away from a dedicated native app toward a lightweight cross-device experience.' },
              { label: 'Testing changed the interface.', body: 'Search and navigation became more prominent based on observed behavior.' },
              { label: 'User behavior changed the roadmap.', body: 'Unexpected engagement with My Museum elevated retention and reflection into a larger product opportunity.' },
            ]}
          />
        </>
      ),
    },
  ],
};

// ── Placeholder studies (same structure; replace copy per project) ──────────

function placeholderStudy(p: Project): CaseStudy {
  const rest = p.railTitle.slice(p.title.length).trim();
  return {
    slug: p.slug,
    draft: true,
    disciplines: p.disciplines,
    title: rest ? [p.title, rest] : [p.title],
    subtitle: p.description,
    meta: [
      ['Timeline', `Placeholder · ${p.year}`],
      ['Role', 'Placeholder role'],
      ['Scope', p.disciplines],
      ['Focus', p.summary],
    ],
    hero: { src: p.cover.src, alt: `${p.railTitle} — cover` },
    overview: (
      <>
        Placeholder overview for {p.railTitle}. Summarise <Hl>what the product is and who it's for</Hl> in two or three
        sentences, then your role from research through final delivery.
      </>
    ),
    blocks: [
      {
        kind: 'content',
        id: 'challenge',
        subtitle: 'Challenge',
        title: 'Placeholder: the core problem, framed as a question',
        body: (
          <>
            <p>Placeholder copy. Describe the situation before this project and why it mattered.</p>
            <Bullets items={['Placeholder pain point one', 'Placeholder pain point two', 'Placeholder pain point three']} />
          </>
        ),
      },
      { kind: 'frame', images: [{ src: STOCK.research, alt: 'Placeholder research image' }], caption: 'Placeholder caption' },
      {
        kind: 'content',
        id: 'research',
        subtitle: 'Research',
        title: 'Placeholder: what you learned',
        body: (
          <>
            <p>Placeholder copy. Who you spoke to, how, and what you were trying to find out.</p>
            <p>
              Placeholder copy. The key insight, with <Hl>the one sentence that changed the direction</Hl> in bold.
            </p>
          </>
        ),
      },
      {
        kind: 'content',
        id: 'approach',
        subtitle: 'Approach',
        title: 'Placeholder: the decision that shaped the work',
        wide: true,
        body: (
          <>
            <p>Placeholder copy. The option you considered, why you moved away from it, and what you chose instead.</p>
            <Cards items={['Placeholder principle', 'Placeholder principle', 'Placeholder principle', 'Placeholder principle']} />
          </>
        ),
      },
      {
        kind: 'frame',
        images: [
          { src: STOCK.sketches, alt: 'Placeholder process image' },
          { src: STOCK.mobile, alt: 'Placeholder process image' },
          { src: p.cover.src, alt: 'Placeholder process image' },
        ],
      },
      {
        kind: 'content',
        id: 'design',
        subtitle: 'Design',
        title: 'Placeholder: designing the core experience',
        body: (
          <Points
            bar
            items={[
              { label: 'Placeholder pillar', body: 'Placeholder description of this part of the experience.' },
              { label: 'Placeholder pillar', body: 'Placeholder description of this part of the experience.' },
              { label: 'Placeholder pillar', body: 'Placeholder description of this part of the experience.' },
            ]}
          />
        ),
      },
      { kind: 'frame', images: [{ src: p.cover.src, alt: `${p.railTitle} — final design` }], caption: 'Placeholder caption — final design' },
      {
        kind: 'content',
        id: 'testing',
        subtitle: 'Testing',
        title: 'Placeholder: what testing changed',
        body: (
          <Points
            items={[
              { label: 'Placeholder finding.', body: 'Placeholder copy — what you observed and what you changed because of it.' },
              { label: 'Placeholder finding.', body: 'Placeholder copy — what you observed and what you changed because of it.' },
            ]}
          />
        ),
      },
      {
        kind: 'stats',
        id: 'outcome',
        label: 'Outcome',
        items: [
          { value: '00', label: 'Placeholder metric' },
          { value: '00', label: 'Placeholder metric' },
          { value: '00', label: 'Placeholder metric' },
          { value: '00', label: 'Placeholder metric' },
        ],
      },
      {
        kind: 'content',
        id: 'reflection',
        subtitle: 'Reflection',
        title: `Placeholder: what ${p.title} taught me`,
        body: <p>Placeholder copy. The lesson you'd carry into the next project.</p>,
      },
    ],
  };
}

/** Written case studies. Every other project gets a draft placeholder in the same structure. */
const WRITTEN: CaseStudy[] = [AMUSE];

export const CASE_STUDIES: CaseStudy[] = PROJECTS.map(
  (p) => WRITTEN.find((c) => c.slug === p.slug) ?? placeholderStudy(p),
);

export const findCaseStudy = (slug: string | undefined) => {
  const study = CASE_STUDIES.find((c) => c.slug === slug);
  const project = findProject(slug);
  return study && project ? { study, project } : undefined;
};
