import { Bullets, Hl, Points } from '../../components/caseStudy';
import type { CaseStudy } from './types';

// Source: Nathan's published KESHO case study (masachidc.com/works/kesho-app).
// Draft until real product screens replace the media slots.
export const kesho: CaseStudy = {
  slug: 'kesho-app',
  status: 'draft',
  title: ['KESHO'],
  tagline: 'A sealed prediction platform for people who predict to be right, not to gamble.',
  facts: [
    ['Timeline', '12 weeks, 2026'],
    ['Role', 'Product designer and full-stack developer'],
    ['Scope', 'Research, product spec, UI, database, deployment'],
    ['Platform', 'Progressive web app'],
  ],
  links: [{ label: 'View web app', href: 'https://heykesho.com/' }],
  glance: [
    { label: 'Problem', text: 'Prediction platforms turn foresight into gambling, leaving out most people who just want to be right.' },
    { label: 'Product', text: 'Predictions sealed at kickoff, timestamped, and revealed with points and XP once the result lands.' },
    { label: 'Ownership', text: 'Research, product specification, interface, database, scoring algorithm, and deployment.' },
  ],
  cover: { slot: 'KESHO cover: prediction card or home feed', ratio: '16/9' },
  overview: (
    <>
      KESHO is a sealed foresight platform. You make a prediction before an event starts; it locks at kickoff, is
      timestamped and verifiable, and reveals your points once the result is in. I took it from{' '}
      <Hl>research and product specification through interface design and the full-stack build</Hl>, working with AI
      tools throughout.
    </>
  ),
  blocks: [
    {
      kind: 'section',
      kicker: 'Problem',
      title: 'Prediction, without the gambling',
      body: (
        <>
          <p>
            Every day, people forecast outcomes in sports, culture, and politics. Almost every platform built around
            prediction turns it into gambling, which excludes most of the people doing it.
          </p>
          <Bullets
            items={[
              'About 1 in 5 US adults actively use online sports betting platforms (Pew Research).',
              'An estimated 56 million Americans filled out March Madness brackets in 2023 (AGA).',
              'Prediction markets like Kalshi and Polymarket still reach fewer than 1% of US adults (Fortune).',
            ]}
          />
        </>
      ),
    },
    {
      kind: 'insight',
      label: 'Insight',
      statement: 'People want to seal their predictions. No money involved.',
      detail:
        'Prediction behavior is massive but informal: brackets, fantasy leagues, group chats. There was room for dedicated prediction infrastructure outside of gambling, timed to the 2026 World Cup.',
    },
    {
      kind: 'media',
      items: [{ slot: 'Prediction card in its Sealed, Live, and Final states', ratio: '16/9' }],
    },
    {
      kind: 'section',
      kicker: 'Product',
      title: 'Four pages, one foresight record',
      body: (
        <Points
          bar
          items={[
            { label: 'Home', body: "Live matches and friends' predictions in a single feed." },
            { label: 'Challenges', body: 'Groups form, rivals compete, and squads advance through a promotions bracket.' },
            { label: 'Votes', body: 'Community opinion on ongoing events.' },
            { label: 'Profile', body: "The user's personal foresight record over time." },
          ]}
        />
      ),
    },
    {
      kind: 'section',
      kicker: 'Design',
      title: 'Designed across tools, finished in code',
      body: (
        <>
          <p>
            I started in Figma for the high-level concept, then used Claude Design for the first UI pass because it held
            the full project scope. I refined in Figma Make and Gemini Canvas, then brought the designs into Claude Code
            and built a consistent design system directly in the codebase.
          </p>
          <p>The result is a dark interface with a single blue accent and Bebas Neue for display type.</p>
        </>
      ),
      media: { slot: 'Design system: color, type, and components', ratio: '16/9' },
    },
    {
      kind: 'media',
      items: [
        { slot: 'Home feed (mobile)', ratio: '3/4' },
        { slot: 'Challenges bracket (mobile)', ratio: '3/4' },
      ],
    },
    {
      kind: 'insight',
      label: 'Decision',
      statement: 'Write once. Sealed at kickoff.',
      detail:
        'Predictions are server-timestamped and cannot be edited after submission. Each one moves through Sealed, Live, and Final states under a single persistent URL.',
    },
    {
      kind: 'section',
      kicker: 'Architecture',
      title: 'Built for a hard deadline',
      body: (
        <>
          <p>
            Development was structured around the FIFA World Cup 2026. The schema is relational and event-driven: users,
            events, predictions, groups, votes, and feed entities. Each prediction is an{' '}
            <Hl>immutable, write-once record</Hl> with a unique constraint, so one user gets one prediction per event.
          </p>
          <Points
            items={[
              { label: 'Framework', body: 'Next.js App Router, React 19, and TypeScript.' },
              { label: 'Data', body: 'Neon Postgres with Drizzle ORM; all times stored in UTC.' },
              { label: 'Services', body: 'Clerk authentication, Resend with React Email, and 3+ API integrations.' },
              { label: 'Delivery', body: 'Tailwind CSS, deployed to Vercel through GitHub Actions; cron jobs lock and reveal results.' },
            ]}
          />
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Scoring',
      title: 'Rewarding accuracy without money',
      body: (
        <p>
          With no monetary incentive, I designed and implemented a unified system of points and XP that rewards both
          accuracy and participation. It combines a probability-weighted foresight algorithm with real event outcomes,
          and it decides group rankings, stakes in rival matchups, and which groups advance through the promotions
          bracket.
        </p>
      ),
    },
    {
      kind: 'section',
      kicker: 'Hard problems',
      title: 'Time zones and languages',
      body: (
        <Points
          items={[
            {
              label: 'UTC to local time.',
              body: 'The external API and database both run in UTC, while users expect local times, so matches showed on the wrong dates. I centralized all scheduling in UTC and moved localization to the UI layer.',
            },
            {
              label: 'Internationalization from day one.',
              body: 'The World Cup is global, so I built a low-cost system that translates interface strings into up to 7 languages in a GitHub Actions workflow at each deployment, with no runtime translation cost.',
            },
          ]}
        />
      ),
    },
    {
      kind: 'section',
      kicker: 'Launch',
      title: 'Web first',
      body: (
        <p>
          KESHO ships as a progressive web app, with a planned route to mobile stores through Android Trusted Web
          Activity and its Apple equivalent. Before launch, a <Hl>referral-based waitlist</Hl> with unique invite links
          was built to drive network formation and squad creation.
        </p>
      ),
    },
    {
      kind: 'outcomes',
      kicker: 'By the numbers',
      items: [
        { value: '12wk', label: 'Project timeline' },
        { value: '4', label: 'Core pages' },
        { value: '7', label: 'Interface languages' },
        { value: '3+', label: 'API integrations' },
      ],
    },
  ],
};
