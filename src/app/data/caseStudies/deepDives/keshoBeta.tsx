import { Bullets, Hl, Points, Table } from '../../../components/caseStudy';
import type { DeepDive } from '../types';

// Figures recovered from the KESHO production database after the beta. Public-facing counts exclude admin accounts.
// Only observational claims: nothing here was a randomized test.
export const keshoBeta: DeepDive = {
  parent: 'kesho-app',
  slug: 'beta-testing',
  title: 'Beta testing: finding what made KESHO stick',
  dek: 'What an invite-only beta could and could not tell me about KESHO, and how I would run it again.',
  description:
    'How an invite-only beta of KESHO separated comprehension from motivation, where repeat use clustered, and what I would measure next time.',
  blocks: [
    {
      kind: 'section',
      kicker: 'Setup',
      title: 'An honest beta',
      body: (
        <>
          <p>
            KESHO was invite-only. I invited 92 people and recruited them myself. 91 non-admin accounts appear in
            the database, 29 of those people made at least one prediction, and together they submitted 584 predictions.
          </p>
          <p>
            That is a useful beta and a poor funnel. I recruited people personally, at different times, with different
            amounts of encouragement. Nobody arrived through a channel I could repeat. So the numbers below describe how
            these people behaved, not how a market would.
          </p>
          <p>
            Every figure here was reconstructed from the production database after the fact. That matters later.
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Onboarding',
      title: 'The first problem was comprehension',
      body: (
        <>
          <p>
            Of the first 30 people to sign up, 18 eventually made a prediction. Among those 18, the median time from
            signup to first prediction was 35.9 hours, and only 6 made one within an hour. Several testers messaged me
            to ask how the product worked.
          </p>
          <p>
            On June 11 I shipped two changes. In the early hours, an onboarding feed inside the product that explained
            Calls through the matches on screen. Later that day, a gate: the community feed stayed locked until you made
            your first prediction.
          </p>
          <Table
            head={['Users who made a first prediction', 'Before', 'After the gate']}
            rows={[
              ['Users', '18', '8'],
              ['First prediction within an hour', '6', '8'],
              ['Median time to first prediction', '35.9 hours', 'About 5 minutes'],
            ]}
            note="After the gate, the median was about 0.09 hours, roughly 5.4 minutes."
          />
          <p>After the change, one tester asked me how KESHO worked. Before it, several had.</p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Caveats',
      title: 'Why I did not compare activation rates',
      body: (
        <>
          <p>
            On paper, the share of signups who went on to predict fell from about 60% to about 18%. Read naively, that
            says onboarding made things worse. It doesn't say that, because the two groups weren't comparable.
          </p>
          <Points
            items={[
              {
                label: 'Recruitment changed.',
                body: 'By June 11 I had slowed and then stopped actively recruiting. Early signups were people I had personally asked; later signups were fewer and less connected to me.',
              },
              {
                label: 'Two changes shipped on the same day.',
                body: 'The onboarding feed and the gate went out hours apart. I can describe what happened after both, not separate their effects.',
              },
              {
                label: 'The numbers are small.',
                body: 'Eight people after the gate is enough to notice a pattern, not to measure one.',
              },
            ]}
          />
          <p>
            What the data does support is narrower. People who chose to try KESHO after the change understood it within
            minutes. <Hl>Onboarding solved a comprehension problem. It did not show demand.</Hl>
          </p>
          <p>
            I had been treating activation as one problem. The beta split it into two: whether people understood KESHO,
            and whether they wanted it.
          </p>
        </>
      ),
    },
    {
      kind: 'media',
      items: [
        { slot: 'First session before onboarding', ratio: '3/4' },
        { slot: 'Onboarding feed and locked community feed', ratio: '3/4' },
      ],
    },
    {
      kind: 'section',
      kicker: 'Groups',
      title: 'Repeat use lived in one group',
      body: (
        <>
          <p>
            The timing matters here. An early version of Groups existed during development, but a schema rebuild on May
            9 deferred it until after launch. The rebuilt Groups feature reached production on June 12, the day after
            the onboarding change. The onboarding results above come from a product without live Groups.
          </p>
          <p>
            Ten groups were created. Three had more than one member. Only one produced meaningful activity from
            anyone other than its owner: a ten-person friend group called Friendly Mosquitoes.
          </p>
          <Table
            head={['Friendly Mosquitoes', 'Count']}
            rows={[
              ['Members', '10'],
              ['Members other than the owner', '9'],
              ['Of those, predicted after joining', '7'],
              ['Of those, made 5 or more predictions after joining', '7'],
              ['Predictions after members joined', '486'],
              ['Of those, from members other than the owner', '397'],
              ['Active prediction days, across a 37-day span', '36'],
            ]}
          />
          <p>Compared with every other user who made at least one prediction, the gap is large.</p>
          <Table
            head={['Activated users', 'Friendly Mosquitoes', 'Everyone else']}
            rows={[
              ['Users', '9', '20'],
              ['Lifetime predictions', '544', '40'],
              ['Median predictions', '91', '1'],
              ['Median active days', '25', '1'],
              ['Median active weeks', '6', '1'],
              ['Reached 5+ predictions', '88.9%', '15%'],
              ['Reached 10+ predictions', '77.8%', '0%'],
            ]}
          />
          <p>
            This doesn't show that Groups caused retention. People chose to join, and they joined because they already
            knew each other. The group could be engaged because of who was
            in it. The fair conclusion is smaller: <Hl>the strongest repeat use in KESHO clustered around social
            competition.</Hl>
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Leaderboard',
      title: 'Movement was followed by a return',
      body: (
        <>
          <p>
            The group leaderboard ranked members by total points, broke ties on XP, and then on username so the order
            was always stable. Each row showed rank, prediction count, XP, and points.
          </p>
          <p>
            To see whether position mattered, I rebuilt the leaderboard for every day of the beta using the same logic
            as production, then looked at what each member did next depending on whether their rank had moved.
          </p>
          <Table
            head={['Rank that day', 'Back next day', 'Back within 3 days', 'Avg. predictions, next 3 days']}
            rows={[
              ['Moved up', '84.2%', '100%', '10.42'],
              ['Moved down', '84.2%', '89.5%', '9.74'],
              ['Stayed the same', '56.3%', '85.4%', '6.58'],
            ]}
          />
          <p>
            Movement in either direction was associated with stronger return behavior than standing still. Moving down
            was followed by nearly as much activity as moving up.
          </p>
          <p>
            This is an observational reconstruction inside one small group, not an experiment. Active people make more
            predictions, and more predictions move ranks, so the arrow could point either way. I treat it as the
            strongest retention hypothesis KESHO produced:
          </p>
          <p className="font-semibold text-ink">Predict, earn points, move in the group, come back, predict again.</p>
        </>
      ),
      media: { slot: 'Group leaderboard: rank, predictions, XP, points', ratio: '16/9' },
    },
    {
      kind: 'section',
      kicker: 'Measurement',
      title: 'The mistake I would fix first',
      body: (
        <>
          <p>
            KESHO had PostHog installed, and it recorded page views. The hooks for product events existed in the code
            but were never called. In practice, I had page views and a database.
          </p>
          <p>
            The database tells you what was saved, not what people tried. A Call started and abandoned, a leaderboard
            viewed and closed, a group invite opened and ignored: none of that left a trace. Every finding above came
            from reconstructing behavior out of records that were never designed for it.
          </p>
          <p>
            The most important learning window of the project, the first weeks of a real tournament with real users,
            happened before I could measure it properly. Instrumentation should have shipped before the beta opened.
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Next time',
      title: 'If I ran it again',
      body: (
        <>
          <p>I would instrument the path that matters before inviting anyone:</p>
          <Bullets
            items={[
              'signup_completed',
              'onboarding_viewed',
              'prediction_started',
              'prediction_sealed',
              'group_joined',
              'leaderboard_viewed',
              'rank_changed',
              'next_prediction',
            ]}
          />
          <p>
            Then I would test the question the beta raised. New users would be assigned at random to one of two first
            experiences: a standalone prediction flow, or a social-context-first flow that starts inside a group with a
            leaderboard. I would compare time to first prediction, return in the second week, and predictions per active
            week.
          </p>
          <p>
            With an invite-only audience, even that would be directional. But it would answer the question I couldn't:
            whether social competition makes predictions repeatable, or whether people who already compete with their
            friends simply find each other.
          </p>
        </>
      ),
    },
  ],
};
