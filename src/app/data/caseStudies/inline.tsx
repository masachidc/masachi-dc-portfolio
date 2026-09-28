import { Hl, Points } from '../../components/caseStudy';
import type { CaseStudy } from './types';

// Source: Nathan's published INLINE case study (masachidc.com/works/inline-chrome-extension).
// Draft until real product screens replace the media slots.
export const inline: CaseStudy = {
  slug: 'inline-chrome-extension',
  status: 'draft',
  title: ['INLINE'],
  tagline: 'A Chrome extension that makes any webpage writable.',
  facts: [
    ['Timeline', '9 weeks, 2026'],
    ['Role', 'UI/UX Designer'],
    ['Team', 'Project lead, front-end, backend, and database'],
    ['Program', 'FIU INIT Build'],
  ],
  glance: [
    { label: 'Problem', text: 'The web is mostly read-only.' },
    { label: 'Product', text: 'A floating icon on every page opens notes, drawing, highlights, and AI for any selected passage.' },
    { label: 'Recognition', text: "Most Unique Project at FIU Blackstone LaunchPad's demo day." },
  ],
  cover: { slot: 'INLINE cover: the extension in use on a live page', ratio: '16/9' },
  overview: (
    <>
      INLINE is a Chrome extension built as a team project in FIU's INIT Build program. It lets people{' '}
      <Hl>annotate, highlight, edit, or summarize any webpage</Hl> and keeps that work stored locally. I was the UI/UX
      designer, working with a project lead, a front-end developer, a backend developer, and a database designer.
    </>
  ),
  blocks: [
    {
      kind: 'section',
      kicker: 'Problem',
      title: 'The web is read-only',
      body: (
        <p>
          Most pages can only be read. INLINE breaks that norm: users can mark up, rewrite, or summarize what they are
          reading, directly on the page, and keep it stored locally.
        </p>
      ),
      media: { slot: 'Floating INLINE icon on a webpage', ratio: '16/9' },
    },
    {
      kind: 'section',
      kicker: 'Interaction',
      title: 'Tools that live on the page',
      body: (
        <>
          <p>On launch, the INLINE icon floats on any webpage. From there, users can:</p>
          <Points
            bar
            items={[
              { label: 'Take notes', body: 'Attach thoughts to the page they belong to.' },
              { label: 'Draw', body: 'Mark up the page directly.' },
              { label: 'Highlight', body: 'Color-code text as they read.' },
              { label: 'Ask AI', body: 'Rephrase, shorten, summarize, or ask a question about a selected passage.' },
            ]}
          />
        </>
      ),
    },
    {
      kind: 'insight',
      label: 'Decision',
      statement: 'Turn each capability into a mini interface.',
      detail:
        'The project started as Figma prototypes that broke the problem into small, focused interfaces sitting on top of the page, rather than one large panel.',
    },
    {
      kind: 'media',
      items: [
        { slot: 'Annotation and highlight tools', ratio: '4/3' },
        { slot: 'AI actions on selected text', ratio: '4/3' },
      ],
    },
    {
      kind: 'section',
      kicker: 'My role',
      title: 'Design across the product',
      body: (
        <>
          <p>
            As the team's UI/UX designer I owned the interface and interaction design, plus iconography, branding, and
            project versioning.
          </p>
          <Points
            items={[
              { label: 'Design', body: 'Figma.' },
              { label: 'Exploration', body: 'Lovable and Stitch.' },
            ]}
          />
        </>
      ),
    },
  ],
};
