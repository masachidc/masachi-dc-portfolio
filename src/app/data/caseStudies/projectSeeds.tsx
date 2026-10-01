import { Hl } from '../../components/caseStudy';
import type { CaseStudy } from './types';

// Source: Nathan's Project SEEDS brief. Facts match profile.ts.
// Media slots await real identity, guideline, application, and website assets (shown only in dev or ?preview).
export const projectSeeds: CaseStudy = {
  slug: 'project-seeds-branding',
  status: 'published',
  title: ['Project SEEDS'],
  tagline: "A distinct identity inside FIU's established brand system.",
  facts: [
    ['Role', 'Marketing Officer · Brand & Web Designer'],
    ['Organization', 'Florida International University'],
    ['Scope', 'Brand identity · Web design · Recruitment'],
    ['Year', '2025'],
  ],
  glance: [
    { label: 'Challenge', text: 'Give Project SEEDS a recognizable identity without making it feel separate from FIU.' },
    { label: 'Decision', text: "Extend the university's existing visual language instead of creating a standalone brand." },
    {
      label: 'Outcome',
      text: 'An identity approved by FIU, a website staff could maintain, and enrollment that more than doubled during the initiative.',
    },
  ],
  cover: { slot: 'Project SEEDS brand guidelines overview', ratio: '16/9' },
  overview: (
    <>
      <p>Project SEEDS needed a more consistent way to show up across recruitment, digital, and program communications.</p>
      <p>
        As Marketing Officer, I was responsible for recruitment as well as the brand and website. The challenge was to
        make SEEDS recognizable on its own while keeping it clearly connected to Florida International University.
      </p>
      <p>
        I developed an <Hl>identity system within FIU's existing brand framework</Hl>, then carried it across campaign
        materials and a website designed for non-technical staff to maintain.
      </p>
      <p>The identity was approved by FIU branding and the SEEDS team. Enrollment more than doubled during the initiative.</p>
    </>
  ),
  description:
    "Brand identity and website for FIU Project SEEDS, designed to create a distinct program identity within the university's established brand system.",
  blocks: [
    {
      kind: 'section',
      kicker: 'Constraint',
      title: 'Building distinction inside an established system',
      body: (
        <>
          <p>SEEDS needed its own voice without looking separate from FIU.</p>
          <p>
            FIU already had an established identity with rules for university marks, color, typography, and hierarchy.
            SEEDS needed enough character to be recognized by students, but not so much that it looked like an unrelated
            organization.
          </p>
          <p>
            That gave me a useful constraint: <Hl>create distinction within the system, not outside it.</Hl>
          </p>
        </>
      ),
    },
    {
      kind: 'media',
      items: [{ slot: 'FIU brand system reference and Project SEEDS context', ratio: '16/9' }],
    },
    {
      kind: 'insight',
      label: 'Decision',
      statement: 'Use FIU as the foundation, then create room for SEEDS to become recognizable.',
      detail:
        'I kept the institutional relationship visible and focused the new identity on the parts SEEDS could own: its symbol, name, supporting typography, layouts, and program-specific applications.',
    },
    {
      kind: 'section',
      kicker: 'Brand audit',
      title: 'I started by defining what could change and what could not',
      body: (
        <>
          <p>
            Before drawing the identity, I reviewed FIU's existing brand language and how SEEDS needed to appear
            alongside it.
          </p>
          <p>
            Some elements already had an answer: the university relationship, core brand colors, and institutional
            hierarchy. The opportunity was to create a recognizable SEEDS layer inside those constraints.
          </p>
          <p>
            That kept the work focused. I wasn't trying to redesign FIU. I was defining how this program could belong to
            it.
          </p>
        </>
      ),
    },
    {
      kind: 'media',
      items: [{ slot: 'FIU colors, typography, and co-branding references', ratio: '16/9' }],
    },
    {
      kind: 'section',
      kicker: 'Concept',
      title: 'Growth gave the identity its visual idea',
      body: (
        <>
          <p>The name already contained the strongest idea.</p>
          <p>
            I explored simple organic forms around seeds, leaves, growth, and emergence, looking for something that could
            feel optimistic without becoming decorative or overly literal.
          </p>
          <p>
            The final symbol reduces that idea to a compact form that can work beside the wordmark, independently at
            small sizes, and alongside FIU branding.
          </p>
        </>
      ),
    },
    {
      kind: 'media',
      items: [
        { slot: 'Early concept sketches and symbol exploration', ratio: '4/3' },
        { slot: 'Refined symbol iterations', ratio: '4/3' },
        { slot: 'Final symbol construction', ratio: '4/3' },
      ],
    },
    {
      kind: 'insight',
      label: 'What changed',
      statement: 'The strongest direction was also the simplest.',
      detail:
        'Reducing the symbol made it easier to recognize, reproduce, and combine with the university identity across very different formats.',
    },
    {
      kind: 'section',
      kicker: 'Identity system',
      title: 'The mark had to work as part of a system',
      body: (
        <>
          <p>
            The final identity combines the organic SEEDS symbol with a typographic system and a color language that
            stays connected to FIU.
          </p>
          <p>
            I developed multiple lockups so the identity could adapt across recruitment materials, digital interfaces,
            presentations, and co-branded university communications without losing recognition.
          </p>
          <p>The goal was consistency without forcing every application into the same layout.</p>
        </>
      ),
    },
    {
      kind: 'media',
      items: [
        { slot: 'Primary identity: symbol and wordmark', ratio: '4/3' },
        { slot: 'Alternate and horizontal lockups', ratio: '4/3' },
        { slot: 'Color applications', ratio: '4/3' },
      ],
    },
    {
      kind: 'section',
      kicker: 'Typography + color',
      title: 'Familiar enough to belong. Distinct enough to be remembered.',
      body: (
        <>
          <p>
            Rather than introduce an entirely separate visual language, I used typography and color to balance the two
            identities.
          </p>
          <p>
            FIU's system provides the institutional foundation. The SEEDS elements add a more focused personality for
            recruitment and program communication.
          </p>
          <p>
            Together, they make the relationship clear without making every SEEDS touchpoint look like a generic
            university document.
          </p>
        </>
      ),
    },
    {
      kind: 'media',
      items: [{ slot: 'Project SEEDS typography and color system', ratio: '16/9' }],
    },
    {
      kind: 'section',
      kicker: 'Brand use',
      title: 'Make correct use easier than incorrect use',
      body: (
        <>
          <p>A useful identity has to work when the original designer is no longer in the room.</p>
          <p>
            I documented how SEEDS should appear with FIU marks, including hierarchy, spacing, logo combinations, and
            examples of incorrect use.
          </p>
          <p>The guidelines gave the team a repeatable system instead of a folder of disconnected assets.</p>
        </>
      ),
    },
    {
      kind: 'media',
      items: [{ slot: 'Project SEEDS brand use guidelines with approved and incorrect examples', ratio: '16/9' }],
    },
    {
      kind: 'insight',
      label: 'Decision',
      statement: 'Design the identity for the people who would use it next.',
      detail: 'The work needed to stay consistent without depending on me to approve every application.',
    },
    {
      kind: 'section',
      kicker: 'Applications',
      title: 'The identity moved from guidelines into recruitment',
      body: (
        <>
          <p>
            I applied the system across the materials students would actually encounter, including recruitment graphics,
            program communications, presentations, and digital content.
          </p>
          <p>
            The applications gave SEEDS a consistent presence while leaving enough flexibility for different campaigns and
            events.
          </p>
        </>
      ),
    },
    {
      kind: 'media',
      items: [
        { slot: 'Recruitment materials and campaign social assets', ratio: '4/3' },
        { slot: 'SEEDS apparel', ratio: '4/3' },
        { slot: 'Presentation graphics', ratio: '4/3' },
      ],
    },
    {
      kind: 'section',
      kicker: 'Website',
      title: 'The website had to work after I left',
      body: (
        <>
          <p>
            I extended the identity into the Project SEEDS website, but visual consistency was only half of the problem.
          </p>
          <p>
            The people maintaining the site would not necessarily be designers or developers, so I structured it around{' '}
            <Hl>clear information hierarchy and repeatable content patterns</Hl> that staff could update without
            rebuilding the experience.
          </p>
          <p>
            The result was a site that carried the new identity online while remaining practical for the team that
            inherited it.
          </p>
        </>
      ),
    },
    {
      kind: 'media',
      items: [
        { slot: 'Project SEEDS website: homepage', ratio: '16/9' },
        { slot: 'Project SEEDS website: program information page', ratio: '16/9' },
        { slot: 'Project SEEDS website: admin / maintenance view (if available)', ratio: '16/9' },
      ],
    },
    {
      kind: 'section',
      kicker: 'Outcome',
      title: 'A system the program could keep using',
      body: (
        <>
          <p>Project SEEDS left the initiative with more than a new logo.</p>
          <p>
            It had a recognizable identity, clear rules for using it alongside FIU, and a website that could be
            maintained by non-technical staff.
          </p>
          <p>I also led recruitment during the initiative. Enrollment more than doubled during that period.</p>
          <p>
            The work gave the program a more consistent foundation for how it presented itself to students and how the
            team carried the brand forward.
          </p>
        </>
      ),
    },
    {
      kind: 'outcomes',
      kicker: 'Results',
      items: [
        { value: 'Approved', label: "Identity aligned with FIU's brand system" },
        { value: 'Maintainable', label: 'Website designed for non-technical staff' },
        { value: '2×+', label: 'Enrollment during the initiative' },
      ],
    },
    {
      kind: 'section',
      kicker: 'Reflection',
      title: 'The constraint made the identity stronger',
      body: (
        <>
          <p>This project changed how I think about brand systems.</p>
          <p>
            The interesting part wasn't making SEEDS look different. It was finding the right amount of difference inside
            a system that already had history, rules, and recognition.
          </p>
          <p>
            That balance between expression and structure is something I now bring into product work too: understand
            what needs to remain stable, then design where change creates value.
          </p>
        </>
      ),
    },
  ],
};
