import { Bullets, Cards, Hl, Points } from '../../components/caseStudy';
import type { CaseStudy } from './types';

// Imagery is generic stock pending real AMUSE assets — replace `src` in place.
const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const amuse: CaseStudy = {
  slug: 'amuse-art-museum',
  status: 'published',
  title: ['AMUSE', 'Art Museum'],
  tagline: 'Making contemporary art easier to discover, plan, and experience in Kenya.',
  facts: [
    ['Timeline', '11 weeks, 2025'],
    ['Role', 'Lead Product Designer'],
    ['Scope', 'Research, Strategy, IA, UI, Prototyping'],
    ['Platform', 'Mobile-first PWA'],
  ],
  glance: [
    { label: 'Problem', text: 'People found exhibitions online, then lost interest when they tried to plan and book a visit.' },
    { label: 'Decision', text: 'A lightweight web platform with M-Pesa in the booking flow, instead of another museum app.' },
    { label: 'Outcome', text: 'Testing with five participants reshaped search and navigation and made My Museum a core feature.' },
  ],
  cover: { slot: 'AMUSE cover', ratio: '16/9', src: img('photo-1518998053901-5348d3961a04'), alt: 'Gallery interior with white walls and framed art' },
  overview: (
    <>
      AMUSE is a mobile-first museum platform designed to connect the fragmented journey between{' '}
      <Hl>discovering an exhibition and actually visiting it</Hl>. I led the experience from research and product
      strategy through interaction design, prototyping, usability testing, and the final design system.
    </>
  ),
  blocks: [
    {
      kind: 'section',
      kicker: 'Challenge',
      title: 'How might we make the journey from discovering art to visiting it feel continuous?',
      body: (
        <>
          <p>
            People were discovering exhibitions through platforms like Instagram and TikTok, but planning a visit was much harder. Research surfaced four recurring problems, all of which broke down the moment someone tried to act on their interest.
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
    {
      kind: 'media',
      items: [{ slot: 'Field research', ratio: '16/9', src: img('photo-1531482615713-2afd69097998'), alt: 'Research session with participants' }],
      caption: 'Field research · Nairobi, Kenya',
    },
    {
      kind: 'section',
      kicker: 'Research',
      title: 'Understanding the journey',
      body: (
        <p>
          I interviewed and surveyed potential visitors to understand how they discovered exhibitions, planned visits, and decided whether to go. People could find interesting exhibitions. The experience broke down when they needed practical information: price, location, availability, accessibility, or a way to book.
        </p>
      ),
    },
    {
      kind: 'insight',
      label: 'Insight',
      statement: "Discovery wasn't the problem. Conversion was.",
      detail: (
        <>
          That shifted the product from an online museum showcase into a tool for <Hl>discovery, planning, and booking</Hl>.
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Product Pivot',
      title: 'A product decision changed the direction',
      wide: true,
      body: (
        <>
          <p>
            My initial concept included a dedicated museum app. Competitive research challenged that assumption. Dedicated museum apps showed weak adoption and high abandonment, while the target experience needed to work across devices with minimal friction.
          </p>
          <p>
            Kenya's mobile-first environment added another constraint: the product needed to remain lightweight and accessible without requiring users to install another application.
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
      kind: 'insight',
      label: 'Decision',
      statement: 'No app to download. One responsive, PWA-style platform instead.',
    },
    {
      kind: 'media',
      items: [
        { slot: 'Early wireframes', ratio: '4/3', src: img('photo-1586281380349-632531db7ed4', 900), alt: 'Early wireframe sketches' },
        { slot: 'Mobile prototype', ratio: '4/3', src: img('photo-1512941937669-90a1b58e7e9c', 900), alt: 'Mobile prototype' },
        { slot: 'Floor-plan reference', ratio: '4/3', src: img('photo-1563381408015-842cbe575d06', 900), alt: 'Museum floor plan reference' },
      ],
    },
    {
      kind: 'section',
      kicker: 'Design',
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
    {
      kind: 'media',
      items: [{ slot: 'Discovery screen', ratio: '16/9', src: img('photo-1541961017774-22349e4a1262'), alt: 'Final concept, discovery screen' }],
      caption: 'Final concept · Discovery screen',
    },
    {
      kind: 'section',
      kicker: 'Usability Testing',
      title: 'Testing changed the product',
      body: (
        <>
          <p>I tested the prototype with five participants across Kenya and the United States. Three behaviors stood out.</p>
          <Points
            items={[
              { label: 'Search needed to be global.', body: 'Participants instinctively looked for search first, so I elevated it into a persistent discovery tool with filters.' },
              { label: 'Important destinations needed persistent navigation.', body: 'Participants missed Events when it sat lower in the page hierarchy. I redesigned mobile navigation to give major destinations direct access.' },
              { label: 'The unexpected feature generated the strongest engagement.', body: 'My Museum, a personal space where visitors could save experiences and reflect on art, was explored by every participant without prompting.' },
            ]}
          />
        </>
      ),
    },
    {
      kind: 'insight',
      label: 'What changed',
      statement: 'My Museum went from experiment to core feature.',
      detail: 'Every participant explored it unprompted. That signal, not the original plan, set its place in the product.',
    },
    {
      kind: 'media',
      items: [{ slot: 'Synthesis', ratio: '16/9', src: img('photo-1517048676732-d65bc937f952'), alt: 'Team synthesis session' }],
      caption: 'Affinity mapping · Post-test synthesis',
    },
    {
      kind: 'section',
      kicker: 'Vision',
      title: 'Designing beyond the transaction',
      body: (
        <>
          <p>Museums are not only places people purchase tickets to. They are places people remember.</p>
          <p>
            That insight shaped <Hl>My Museum</Hl> into a layer that extends the experience beyond booking: visitors can preserve exhibitions, artworks, and reflections as part of their personal relationship with art.
          </p>
          <p>
            I also explored <Hl>Art, But With You</Hl>, a participatory concept that allows visitors to contribute to a shared physical artwork. Together, these ideas moved AMUSE from a booking utility toward a platform connecting the experience before, during, and after a museum visit.
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Accessibility',
      title: 'Accessibility by design',
      body: (
        <>
          <p>
            The interface was designed around accessible contrast, scalable typography, screen-reader considerations, and clear interaction states.
          </p>
          <p>
            Museum pages also surface physical accessibility information so visitors can understand whether a venue meets their needs before making the trip. Accessibility became part of planning the experience, rather than a setting users had to discover later.
          </p>
        </>
      ),
    },
    {
      kind: 'outcomes',
      kicker: 'Outcome',
      items: [
        { value: '5', label: 'Usability participants' },
        { value: '3', label: 'Major pivots driven by evidence' },
        { value: '11wk', label: 'End-to-end design sprint' },
        { value: '1', label: 'Unified cross-device experience' },
      ],
    },
    {
      kind: 'section',
      kicker: 'Reflection',
      title: 'What AMUSE taught me',
      body: (
        <>
          <p>Good product design is not about defending the first concept. It is about finding the strongest evidence for what the product should become.</p>
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
