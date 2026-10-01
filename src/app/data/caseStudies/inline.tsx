import { Bullets, Hl, Points } from '../../components/caseStudy';
import type { CaseStudy } from './types';

// Source: Nathan's published INLINE case study (masachidc.com/works/inline-chrome-extension). Facts match profile.ts.
// Media slots render as labelled "Image coming soon" placeholders until real product screens replace them.
export const inline: CaseStudy = {
  slug: 'inline-chrome-extension',
  status: 'published',
  title: ['INLINE'],
  tagline: 'A Chrome extension that makes any webpage writable.',
  facts: [
    ['Timeline', '9 weeks · 2026'],
    ['Role', 'UI/UX Designer'],
    ['Team', '5-person product team'],
    ['Program', 'FIU INIT Build'],
  ],
  glance: [
    { label: 'Problem', text: 'Most of the web is built to be read, not worked on.' },
    { label: 'Product', text: 'A floating extension that adds notes, drawing, highlights, and AI directly to any page.' },
    { label: 'Recognition', text: "Most Unique Project at FIU Blackstone LaunchPad's demo day." },
  ],
  cover: { slot: 'INLINE extension in use on a live webpage', ratio: '16/9' },
  overview: (
    <>
      <p>
        INLINE was a team-built Chrome extension for people who wanted to work directly on the web instead of constantly
        switching between tabs, notes apps, and AI tools.
      </p>
      <p>
        I owned the UI/UX design across the extension, from the floating entry point and tool interactions to the visual
        system, iconography, and feature states. I worked alongside a project lead, front-end developer, backend
        developer, and database designer.
      </p>
      <p>
        The product turned <Hl>any webpage into a working surface</Hl> for notes, drawing, highlighting, and AI-assisted
        actions while keeping the experience lightweight enough to stay out of the way.
      </p>
    </>
  ),
  description:
    'UI/UX design for INLINE, a Chrome extension that adds notes, drawing, highlighting, and contextual AI directly to any webpage.',
  blocks: [
    {
      kind: 'section',
      kicker: 'Problem',
      title: 'The web is mostly read-only',
      body: (
        <>
          <p>Most webpages are designed for consumption.</p>
          <p>
            When people want to annotate something, save a thought, compare ideas, or ask AI about a passage, they usually
            have to leave the page and move their context somewhere else.
          </p>
          <p>
            INLINE started from a simple question: <Hl>what if the tools could come to the page instead?</Hl>
          </p>
        </>
      ),
      media: { slot: 'Floating INLINE icon on a live webpage', ratio: '16/9' },
    },
    {
      kind: 'insight',
      label: 'Insight',
      statement: 'The product should add capability without taking over the page.',
      detail:
        'INLINE had to be present enough to be useful, but quiet enough that it did not become another interface competing with the content underneath.',
    },
    {
      kind: 'section',
      kicker: 'Entry point',
      title: 'One small control opens the whole product',
      body: (
        <>
          <p>The extension begins with a floating INLINE icon that stays available while the user browses.</p>
          <p>
            Instead of opening a separate dashboard, the icon acts as the entry point into a set of focused tools that
            appear only when they are needed.
          </p>
          <p>
            That kept the product close to the content and reduced the distance between reading something and acting on
            it.
          </p>
        </>
      ),
      media: { slot: 'INLINE launcher and first-level tool menu', ratio: '16/9' },
    },
    {
      kind: 'section',
      kicker: 'Interaction model',
      title: 'Each task became a small interface',
      body: (
        <>
          <p>Rather than building one large extension panel, I separated the core actions into focused mini interfaces.</p>
          <Points
            bar
            items={[
              { label: 'Notes', body: 'Take notes tied to the page.' },
              { label: 'Draw', body: 'Draw directly over content.' },
              { label: 'Highlight', body: 'Mark text in color while reading.' },
              { label: 'Ask AI', body: 'Rewrite, shorten, or summarize a selected passage, or ask a question about it.' },
            ]}
          />
          <p>
            Each tool was easier to understand on its own, and the set could grow without turning INLINE into a crowded
            control panel.
          </p>
        </>
      ),
    },
    {
      kind: 'insight',
      label: 'Decision',
      statement: 'Turn each capability into a mini interface instead of one large panel.',
      detail:
        'That kept the product modular, reduced visual clutter, and made individual tools easier to understand in context.',
    },
    {
      kind: 'media',
      items: [
        { slot: 'Notes interface', ratio: '4/3' },
        { slot: 'Drawing interface', ratio: '4/3' },
        { slot: 'Highlighting and AI interface', ratio: '4/3' },
      ],
    },
    {
      kind: 'section',
      kicker: 'Notes',
      title: 'Notes stay attached to the page they came from',
      body: (
        <>
          <p>Notes gave users a lightweight place to capture thoughts without breaking their browsing flow.</p>
          <p>
            The interaction had to feel closer to <Hl>a margin note than a full notes app</Hl>, so I kept the interface
            focused on writing, saving, and returning to context.
          </p>
        </>
      ),
    },
    {
      kind: 'media',
      items: [
        { slot: 'Notes closed state', ratio: '4/3' },
        { slot: 'Notes editor', ratio: '4/3' },
        { slot: 'Saved note state', ratio: '4/3' },
      ],
    },
    {
      kind: 'section',
      kicker: 'Drawing',
      title: 'Mark up the page directly',
      body: (
        <>
          <p>Drawing turned the page itself into a temporary canvas.</p>
          <p>
            The challenge was making the tools reachable without covering the content people were trying to annotate, so I
            kept the controls compact and visually secondary to the page.
          </p>
        </>
      ),
    },
    {
      kind: 'media',
      items: [
        { slot: 'Drawing toolbar', ratio: '4/3' },
        { slot: 'Annotated webpage', ratio: '4/3' },
      ],
    },
    {
      kind: 'section',
      kicker: 'Highlighting',
      title: 'Highlighting needed to feel immediate',
      body: (
        <>
          <p>Highlighting is a simple action, so the interface had to stay equally simple.</p>
          <p>Users select text, choose a color, and keep reading without entering a separate workflow.</p>
          <p>The goal was to make annotation feel like part of browsing rather than a mode switch.</p>
        </>
      ),
    },
    {
      kind: 'media',
      items: [
        { slot: 'Highlight color options', ratio: '4/3' },
        { slot: 'Highlighted text in context', ratio: '4/3' },
      ],
    },
    {
      kind: 'section',
      kicker: 'Ask AI',
      title: 'AI stayed tied to the selected passage',
      body: (
        <>
          <p>
            Instead of sending users to a separate chatbot, INLINE keeps AI actions attached to the text they are already
            reading. A selected passage can be:
          </p>
          <Bullets items={['Rewritten', 'Shortened', 'Summarized', 'Used as context for a question']} />
          <p>
            That kept the interaction contextual and removed the work of copying, switching tabs, and rebuilding context
            somewhere else.
          </p>
        </>
      ),
    },
    {
      kind: 'media',
      items: [
        { slot: 'Selected text with AI actions', ratio: '4/3' },
        { slot: 'AI response state', ratio: '4/3' },
      ],
    },
    {
      kind: 'insight',
      label: 'What changed',
      statement: 'AI worked better as a contextual tool than as a destination.',
      detail:
        'The value was not adding another chatbot. It was letting users act on the content already in front of them.',
    },
    {
      kind: 'section',
      kicker: 'Design system',
      title: 'The interface needed to stay consistent across small tools',
      body: (
        <>
          <p>Because INLINE is made up of several mini interfaces, consistency mattered.</p>
          <p>
            I created a lightweight visual system for color, typography, iconography, spacing, controls, and tool states.
            It gave each feature enough identity to be understandable while keeping the extension recognizable as one
            product.
          </p>
        </>
      ),
      media: { slot: 'INLINE design system: color, typography, controls, and iconography', ratio: '16/9' },
    },
    {
      kind: 'section',
      kicker: 'Iconography',
      title: 'Icons carried a lot of responsibility',
      body: (
        <>
          <p>
            INLINE often had very little room for text, which made icon clarity especially important for actions like
            notes, draw, highlight, rewrite, and AI.
          </p>
          <p>
            I designed the icon set to stay legible at small sizes and to feel consistent across the floating launcher,
            toolbars, and feature panels.
          </p>
        </>
      ),
      media: { slot: 'INLINE icon set and toolbar applications', ratio: '16/9' },
    },
    {
      kind: 'section',
      kicker: 'Collaboration',
      title: 'I owned design across the extension',
      body: (
        <>
          <p>
            I worked with teammates responsible for product leadership, front-end development, backend development, and
            database work. My part covered:
          </p>
          <Bullets
            items={[
              'Interaction design',
              'Visual design',
              'Interface states',
              'Iconography',
              'Design system',
              'Feature flows',
              'Design handoff and iteration with engineering',
            ]}
          />
        </>
      ),
    },
    {
      kind: 'insight',
      label: 'Decision',
      statement: 'Design for implementation, not just presentation.',
      detail:
        'Because the interface was being built during the program, I had to think about reusable patterns, interface states, and how the pieces would behave inside real webpages.',
    },
    {
      kind: 'insight',
      label: 'Recognition',
      statement: "Most Unique Project at FIU Blackstone LaunchPad's demo day.",
      detail:
        'For me, the strongest part of the idea was not any one feature. It was the interaction model: turning the page itself into the workspace.',
    },
    {
      kind: 'section',
      kicker: 'Outcome',
      title: 'A browser extension built around staying in context',
      body: (
        <>
          <p>INLINE combined notes, drawing, highlighting, and AI into one lightweight layer over the web.</p>
          <p>
            The project gave me experience designing a product that had to work inside someone else's interface,
            coordinate multiple tools without becoming cluttered, and translate interaction concepts into something a
            development team could build.
          </p>
          <p>
            It reinforced a principle I keep coming back to: <Hl>good tools reduce the distance between intent and
            action.</Hl>
          </p>
        </>
      ),
    },
    {
      kind: 'outcomes',
      kicker: 'Results',
      items: [
        { value: '4', label: 'Core tools' },
        { value: '9 weeks', label: 'Built with a five-person team' },
        { value: 'Most Unique', label: 'FIU Blackstone LaunchPad demo day' },
      ],
    },
    {
      kind: 'section',
      kicker: 'Reflection',
      title: 'Design around the page, not over it',
      body: (
        <>
          <p>
            INLINE taught me that browser products have a different constraint from standalone apps: the product has to
            coexist with an interface it does not control.
          </p>
          <p>
            The best decisions were the ones that kept INLINE lightweight, contextual, and modular. That meant resisting a
            large dashboard and designing small tools that appear only when they are useful.
          </p>
        </>
      ),
    },
  ],
};
