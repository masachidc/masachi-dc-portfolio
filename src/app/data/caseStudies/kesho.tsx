import { DeepLink, Hl, Points, Table } from '../../components/caseStudy';
import { keshoBeta } from './deepDives/keshoBeta';
import { keshoCapacitor } from './deepDives/keshoCapacitor';
import { keshoSealed } from './deepDives/keshoSealed';
import type { CaseStudy } from './types';

// Source of truth: the KESHO repo (masachidc/kesho) and beta figures recovered from its production database.
// Release language is exact: web in production, Android in Google Play closed testing, iOS submitted and rejected.
// Beta findings are observational. Never state them as causal.
export const kesho: CaseStudy = {
  slug: 'kesho-app',
  status: 'published',
  title: ['KESHO'],
  tagline:
    'A social prediction product for football fans. I designed it, built it, shipped it, tested it with real users, and decided to stop.',
  facts: [
    ['Role', 'Product design and engineering'],
    ['Built', 'March to June 2026'],
    ['Beta', 'Invite-only, 92 people'],
    ['Status', 'Decommissioned'],
  ],
  glance: [
    {
      label: 'Product',
      text: 'Seal a Call on a match before kickoff. The server timestamps it, and nobody can rewrite it after the result.',
    },
    {
      label: 'Evidence',
      text: 'Onboarding fixed comprehension. Repeat use clustered in one ten-person friend group competing on a leaderboard.',
    },
    {
      label: 'Decision',
      text: 'Complexity was growing faster than evidence. I stopped rather than scale a mechanic I would have had to rebuild.',
    },
  ],
  cover: { slot: 'KESHO home feed with a sealed Call', ratio: '16/9' },
  overview: (
    <>
      <p>
        KESHO was a social prediction product built around the 2026 World Cup. You made a Call before kickoff and
        sealed it. The server stamped the time, and once the match started the Call could not change.{' '}
        <Hl>Call it before kickoff. Prove it after the whistle.</Hl>
      </p>
      <p>
        I took it through the whole lifecycle: designed, developed, deployed, and decommissioned. This is that story,
        including the parts I would do differently.
      </p>
    </>
  ),
  description:
    'KESHO, a social prediction product for football fans: designed, built, deployed, tested in an invite-only beta, and decommissioned. A case study in product and engineering judgment.',
  blocks: [
    // ── Designed ────────────────────────────────────────────────────────────
    {
      kind: 'chapter',
      label: 'Designed',
      title: 'A record that can’t be rewritten',
      lede: 'Most of the design work was deciding what the product would refuse to do.',
    },
    {
      kind: 'section',
      kicker: 'The alibi',
      title: 'On record before the result',
      body: (
        <>
          <p>
            Every group chat has someone who says they saw the result coming. KESHO was built to settle that. A Call only
            counts if it exists before kickoff, and its time comes from the server, not the phone.
          </p>
          <p>
            That rule shaped everything else. There is no edit button. A bad miss can’t be deleted. If the record can be
            rewritten, it isn’t evidence. <Hl>The alibi is the product.</Hl>
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Borrowed screen time',
      title: 'Designed for someone watching something else',
      body: (
        <>
          <p>
            People open a football app minutes before a match or during it. Their attention belongs to the game. I held
            every interaction to a 30-second budget and asked each screen to make sense at a glance.
          </p>
          <p>
            So state did the explaining. Instead of labels and metadata, a single card showed where a Call stood, and
            the same card appeared on every surface: home, feed, profile, group.
          </p>
          <Points
            bar
            items={[
              {
                label: 'Sealed',
                body: 'Made before kickoff. You see your picks. Other people’s stay hidden until you’ve made your own.',
              },
              { label: 'Live', body: 'Kickoff locks the Call. The card follows the match.' },
              {
                label: 'Final',
                body: 'The result lands. Each pick resolves to correct, incorrect, or void, and the points arrive.',
              },
            ]}
          />
        </>
      ),
    },
    {
      kind: 'media',
      wide: true,
      items: [{ slot: 'One match card in its Sealed, Live, and Final states', ratio: '16/9' }],
    },
    {
      kind: 'section',
      kicker: 'Community',
      title: 'Friends give the record weight',
      body: (
        <p>
          A correct Call alone in a database means very little. The same Call means something when your friends called
          the same match and can see who was right. Results and sharing were primary surfaces, not extras. Whether
          friends would actually make KESHO a habit was the question I most wanted the beta to answer.
        </p>
      ),
    },
    {
      kind: 'section',
      kicker: 'The contradiction',
      title: 'No money, but a sportsbook’s grammar',
      body: (
        <>
          <p>
            KESHO had no real-money wagering, and I worked to keep it from reading as betting. Then I designed the
            scoring.
          </p>
          <p>
            A Call picked the winner and could add extra picks: both teams to score, first team to score, total goals,
            anytime scorer, correct score, player to be carded. Points for the winner were weighted by implied
            probability, so backing the underdog paid more.
          </p>
          <p>
            Those are betting markets. I changed “Predict” to “Call” to change how it felt. The mechanic underneath stayed
            the same.
          </p>
        </>
      ),
    },
    {
      kind: 'media',
      items: [
        { slot: 'Call form: winner, extra picks, and confidence', ratio: '3/4' },
        { slot: 'Sealed confirmation', ratio: '3/4' },
      ],
    },

    // ── Developed ───────────────────────────────────────────────────────────
    {
      kind: 'chapter',
      label: 'Developed',
      title: 'What “sealed” required',
      lede: 'A promise in the interface is only as good as the system behind it.',
    },
    {
      kind: 'section',
      kicker: 'Integrity',
      title: 'Making the rule true',
      body: (
        <>
          <p>
            Sealed was easy to draw and harder to make true. I tried to make each rule hold in more than one layer, so a
            single bug couldn’t quietly break it.
          </p>
          <Points
            items={[
              {
                label: 'A kickoff gate on the server.',
                body: 'Every submission is checked against kickoff by the server. The phone’s clock is never trusted.',
              },
              {
                label: 'One Call per match, and no way to edit it.',
                body: 'A unique constraint in Postgres, no edit route in the API, and a database check that stops a Call being revealed before it was locked.',
              },
              {
                label: 'Locks that recover.',
                body: 'A job scheduled for each kickoff locks that match. A recovery job catches any match the schedule missed.',
              },
              {
                label: 'All-or-nothing reveal.',
                body: 'Results arrive from an external sports-data feed. Grading, points, and XP for a match are written in one transaction.',
              },
              {
                label: 'Redaction before kickoff.',
                body: 'Other people’s picks stay out of what the server sends until it’s fair to see them.',
              },
            ]}
          />
          <DeepLink to={keshoSealed} />
        </>
      ),
    },
    {
      kind: 'media',
      wide: true,
      items: [{ slot: 'Call lifecycle: submit, seal, lock, ingest result, grade, reveal', ratio: '16/9' }],
    },
    {
      kind: 'section',
      kicker: 'Architecture',
      title: 'Built ahead of the evidence',
      body: (
        <>
          <p>
            Some of the system I would defend today: the lifecycle rules, the atomic reveal, server-side redaction, the
            recovery jobs, a state-driven match card, Postgres on Supabase with Drizzle on Vercel, and Sentry. An auth
            abstraction let me move from Clerk to Supabase Auth without touching app code.
          </p>
          <p>
            Other parts were built for a product that didn’t exist yet: a competition graph for brackets and promotions
            before anyone had competed, a Redis queue for follows, several cached copies of the same feed, translation
            scaffolding for nine languages, a second vertical before the first was validated, and a large admin surface.
          </p>
          <p>
            And the usual debts came with it. No meaningful automated tests, stub routes and dead schema, analytics that
            were never properly wired, and docs that drifted from the code.
          </p>
        </>
      ),
    },
    {
      kind: 'insight',
      label: 'Recognition',
      statement: 'I was building for scale before I had evidence anyone would stay.',
      detail:
        'None of these choices was wrong on its own. Together they made every next decision more expensive to make.',
    },

    // ── Deployed ────────────────────────────────────────────────────────────
    {
      kind: 'chapter',
      label: 'Deployed',
      title: 'Real software, small distribution',
      lede: 'KESHO ran in production with real users. It never had a public mobile launch, and the numbers should be read that way.',
    },
    {
      kind: 'section',
      kicker: 'Release',
      title: 'Where it actually shipped',
      body: (
        <>
          <Points
            items={[
              { label: 'Web.', body: 'Deployed to production.' },
              { label: 'Android.', body: 'Google Play closed testing. Never promoted to public production.' },
              { label: 'iOS.', body: 'Submitted for App Store review and rejected over how it presented World Cup branding.' },
            ]}
          />
          <p>The beta was invite-only, and I recruited the testers myself.</p>
        </>
      ),
    },
    {
      kind: 'media',
      items: [
        { slot: 'Production app: home feed', ratio: '3/4' },
        { slot: 'Production app: match card', ratio: '3/4' },
        { slot: 'Production app: profile', ratio: '3/4' },
      ],
    },
    {
      kind: 'outcomes',
      kicker: 'The beta',
      items: [
        { value: '92', label: 'People invited' },
        { value: '29', label: 'Made at least one prediction' },
        { value: '584', label: 'Predictions submitted' },
      ],
    },
    {
      kind: 'section',
      kicker: 'Onboarding',
      title: 'First, people didn’t understand it',
      body: (
        <>
          <p>
            Early testers kept messaging me to ask how KESHO worked. Of the first 30 signups, 18 eventually made a
            prediction, but the median wait was a day and a half.
          </p>
          <p>
            On June 11 I shipped an onboarding feed inside the product. Later that day I locked the community feed until
            a user made their first prediction.
          </p>
          <Table
            head={['Among users who predicted', 'Before', 'After']}
            rows={[
              ['Users', '18', '8'],
              ['Within an hour of signup', '6', '8'],
              ['Median time to first', '35.9 h', '~5.4 min'],
            ]}
          />
          <p>
            Afterwards, one tester asked me how it worked. I did not compare activation rates. By then I had slowed
            recruitment, so the later signups were a different and smaller group. The narrower claim holds: people who
            chose to try KESHO now understood it in minutes.
          </p>
        </>
      ),
      media: { slot: 'Onboarding feed and the locked community feed', ratio: '16/9' },
    },
    {
      kind: 'insight',
      label: 'Insight',
      statement: 'I had been treating activation as one problem. The beta separated comprehension from motivation.',
      detail: 'Onboarding fixed whether people understood KESHO. It said nothing about whether they wanted it.',
    },
    {
      kind: 'section',
      kicker: 'Groups',
      title: 'Repeat use lived in one group',
      body: (
        <>
          <p>
            The rebuilt Groups feature reached production on June 12, the day after the onboarding change. Ten groups
            were created and three had more than one member. One, a ten-person friend group called Friendly Mosquitoes,
            did nearly all the repeat activity: 486 predictions after its members joined, 397 of them from people other
            than the owner, on 36 days of a 37-day span.
          </p>
          <Table
            head={['Activated users', 'The group', 'Everyone else']}
            rows={[
              ['Users', '9', '20'],
              ['Median predictions', '91', '1'],
              ['Median active days', '25', '1'],
              ['Reached 10+ predictions', '78%', '0%'],
            ]}
          />
          <p>
            Groups didn’t cause this. People chose to join, and they joined because they already knew each other. The
            fair reading: <Hl>the strongest repeat use in KESHO clustered around social competition.</Hl>
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Leaderboard',
      title: 'Movement, then a return',
      body: (
        <>
          <p>
            The group leaderboard ranked members by points, with XP and then username breaking ties. I rebuilt each day’s
            standings from production data with the same logic and looked at what people did next.
          </p>
          <p>
            After a day where their rank moved, up or down, 84% of members were back the next day. After a day where it
            didn’t move, 56% were.
          </p>
          <p>
            That is an association inside one small group, not an experiment. It is also the strongest retention
            hypothesis KESHO produced: predict, earn points, move in the group, come back, predict again.
          </p>
          <DeepLink to={keshoBeta} />
        </>
      ),
      media: { slot: 'Friendly Mosquitoes group leaderboard', ratio: '16/9' },
    },

    // ── Decommissioned ──────────────────────────────────────────────────────
    {
      kind: 'chapter',
      label: 'Decommissioned',
      title: 'Complexity outran evidence',
      lede: 'The beta found something real. The question was what it would cost to find out more.',
    },
    {
      kind: 'section',
      kicker: 'The cost',
      title: 'Attention was the expensive part',
      body: (
        <>
          <p>
            By the end, KESHO had around 80 API routes, 32 tables, 37 migrations, and no meaningful automated tests. My
            debug logs record at least 21 debugging sessions on at least 20 different days, and a large share of the late
            commits went into native, auth, and build infrastructure rather than the product.
          </p>
          <p>
            The incidents were the kind that stop a small team shipping anything else: a production white screen,
            fallout from a schema rebuild, reveal correctness bugs, sealed picks reaching the client before kickoff,
            repeated rework of native sign-in, storage failures, iOS build problems, and races between deep links and
            navigation.
          </p>
          <p>Each one was fixable. Together they took most of my attention.</p>
        </>
      ),
      media: { slot: 'Timeline: builds, incidents, and beta activity', ratio: '16/9' },
    },
    {
      kind: 'section',
      kicker: 'Capacitor',
      title: 'Capacitor did not fail',
      body: (
        <>
          <p>
            The iOS and Android apps were Capacitor shells around the production web app. Both platforms built, and both
            reached review.
          </p>
          <p>
            The cost was everything around the shell. Google sign-in won’t run inside a WebView, so auth had to leave
            the app and come back. Sign-in state had to survive that trip, and survive the OS killing the app halfway
            through. Deep links had to land on the right screen without racing the router. Each platform behaved
            differently, and every native change meant another build and another review.
          </p>
          <p>That is a fair price for a product with demand. It was a lot to pay for one still looking for it.</p>
          <DeepLink to={keshoCapacitor} />
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Operating surface',
      title: 'More than a codebase',
      body: (
        <>
          <p>
            A football prediction product operates in more places than its code. Fixtures, teams, and players come from a
            data provider with its own usage terms. Competition names and marks belong to their owners. User posts need
            moderation. App stores decide how to classify what you ship.
          </p>
          <p>
            The iOS rejection made this concrete: the problem was how the app presented World Cup branding. None of this
            made KESHO unlawful or unfixable. It meant the surface I would have to operate was growing as fast as the
            code.
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Betting',
      title: 'The contradiction came due',
      body: (
        <>
          <p>
            When KESHO read as betting-adjacent, I first treated it as a positioning problem. Change the verb. Say “no
            real money” everywhere.
          </p>
          <p>
            Auditing the scoring showed the problem was mechanical. Probability-weighted points and picks that mirror
            betting markets look like a sportsbook because they are built like one. Fixing that properly meant
            redesigning the scoring, during the tournament, with one small group of friends as my only real evidence.
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'The decision',
      title: 'Whether I should',
      body: (
        <>
          <p>
            I could solve the native issues. I could harden the backend. I could remove the problematic branding. I could
            keep improving onboarding.
          </p>
          <p className="font-semibold text-ink">The harder question was whether I should.</p>
          <p>
            KESHO had found something worth testing: social competition appeared to make sealed predictions more
            repeatable. But that evidence lived inside one small group, while the infrastructure, distribution, platform,
            data, and product complexity kept growing. <Hl>The evidence had not earned the complexity.</Hl>
          </p>
          <p>So I stopped.</p>
        </>
      ),
    },

    // ── Reflection ──────────────────────────────────────────────────────────
    {
      kind: 'chapter',
      label: 'Reflection',
      title: 'What I would keep',
    },
    {
      kind: 'section',
      kicker: 'Lessons',
      title: 'Evidence should earn complexity',
      body: (
        <Points
          items={[
            { label: 'Usability and demand are different problems.', body: 'Onboarding can make a product understandable. It can’t make people want it.' },
            { label: 'A retention signal is not validation.', body: 'One engaged friend group is a reason to test further, not a reason to scale.' },
            { label: 'Correct isn’t the same as worth it.', body: 'Technical correctness doesn’t justify technical investment.' },
            {
              label: 'Instrument before the window opens.',
              body: 'My analytics recorded page views and little else. The most important weeks of the project happened before I could measure them properly.',
            },
            { label: 'Stopping is a product decision too.', body: 'Knowing when not to keep building is part of owning a product.' },
          ]}
        />
      ),
    },
    {
      kind: 'insight',
      label: 'Recognition',
      statement: 'The mistake was not building something complex. It was letting complexity get ahead of evidence.',
    },
  ],
};
