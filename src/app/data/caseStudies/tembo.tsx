import { DeepLink, Hl, Points, Sequence } from '../../components/caseStudy';
import { TEMBO_APP_STORE } from '../profile';
import { temboHome } from './deepDives/temboHome';
import { temboPrivacy } from './deepDives/temboPrivacy';
import type { CaseStudy } from './types';

// Source of truth: the Tembo repo (masachidc/tembo, main), read-only: docs/27, docs/PRODUCT_ROADMAP.md,
// docs/TEMBO_PRODUCT_PRINCIPLES.md, docs/CURRENT_STATE.md, ADR-0009/0010, the capacity certification, and the code.
// Release language is exact: iOS live on the App Store, Android in Google Play closed testing.
// Capacity figures are synthetic. No usage, retention or growth claims: none are verified.
export const tembo: CaseStudy = {
  slug: 'tembo-app',
  status: 'published',
  title: ['TEMBO'],
  tagline: 'A social app for the parts of life that keep going.',
  facts: [
    ['Role', 'Founder · Product Designer · Design Engineer'],
    ['Timeline', 'August 2026 – Present'],
    ['Platform', 'iOS · Android'],
    ['Status', 'Live on the App Store · Android in Google Play closed testing'],
  ],
  links: [{ label: 'View on the App Store', href: TEMBO_APP_STORE }],
  glance: [
    {
      label: 'Idea',
      text: 'The ongoing chapter, not the single post, is the social object. Storylines hold it. Moments are authored inside it.',
    },
    {
      label: 'Decisions',
      text: 'A deliberately small first version, a Home feed with bounded diversity instead of engagement ranking, and privacy that follows the product’s hierarchy.',
    },
    {
      label: 'Status',
      text: 'Live on iOS, in closed testing on Android. Shipping proved I could build it. It hasn’t proved people will adopt it.',
    },
  ],
  cover: { slot: 'Home, a Storyline, and Persona on three phones', ratio: '16/9' },
  overview: (
    <>
      <p>
        Most social products are organized around the individual post. Tembo asks a different question: what if the
        ongoing chapter of someone’s life became the primary social object instead?
      </p>
      <p>
        I founded Tembo, then designed, engineered and shipped it. This is the story of the decisions that shaped it,
        what I deliberately left out, and what is still unknown.
      </p>
    </>
  ),
  description:
    'Tembo is a social app built around Storylines: ongoing parts of life that grow through Moments over time. I designed, engineered and shipped the product from first principles to the App Store.',
  blocks: [
    {
      kind: 'section',
      kicker: 'The idea',
      title: 'Life doesn’t happen one post at a time',
      body: (
        <>
          <p>
            A post is a good container for a moment. It is a poor one for the things that take months: building a
            company, training for a race, a first year of college, a dog growing up, Sunday dinners with a parent, a
            place you keep going back to.
          </p>
          <p>
            On most social apps those things exist as scattered posts. The continuity, the part that gives each post its
            meaning, lives only in the poster’s head.
          </p>
          <p>
            Tembo makes the continuity the object. A <Hl>Storyline</Hl> holds an ongoing part of someone’s life. A{' '}
            <Hl>Moment</Hl> is something authored inside it.
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Continuity',
      title: 'Two primitives, deliberately different',
      body: (
        <>
          <Points
            bar
            items={[
              {
                label: 'Storyline',
                body: 'The durable thing. It has its own identity, an ordered history, its own audience, and a lifecycle. Closing a Storyline doesn’t hide it, and reopening it keeps the same history.',
              },
              {
                label: 'Moment',
                body: 'An authored occurrence inside a Storyline. At launch every Moment is a photo, but the model never defines a Moment as an image. Its meaning comes from where it sits in the Storyline.',
              },
            ]}
          />
          <p>
            Keeping them separate changed what following means. On Tembo you can follow a Storyline instead of a whole
            person. Someone might want to follow my startup Storyline without caring about everything else I share.
          </p>
          <p>
            That is the clearest example of the model changing social behavior. It is a capability I designed for, not a
            behavior I have measured yet.
          </p>
        </>
      ),
    },
    {
      kind: 'media',
      items: [
        { slot: 'A Storyline accumulating Moments over time', ratio: '3/4' },
        { slot: 'A visitor’s view of a Storyline, with Follow', ratio: '3/4' },
      ],
    },
    {
      kind: 'section',
      kicker: 'Scope',
      title: 'A social product can expand forever',
      body: (
        <>
          <p>
            Comments, likes, messaging, notifications, groups, ranking. Each is reasonable, and each would have made the
            first version harder to read.
          </p>
          <p>
            The first version had one question to answer: is Storyline-based sharing interesting enough to stand on its
            own? So it shipped what that question needed, plus what a real social app can’t launch without.
          </p>
          <Points
            items={[
              {
                label: 'To test the idea.',
                body: 'Home, a profile (the Persona tab, one of only two), creating Storylines, photo Moments, and discovering and following Storylines.',
              },
              {
                label: 'To be safe to open.',
                body: 'Account and Storyline privacy, Sign in with Apple and Google, photo moderation before publishing, report and block, and account deletion.',
              },
            ]}
          />
          <p>
            Leaving out likes and comments was sequencing, not ideology. The roadmap now adds private Storyline views,
            then Moment views and likes, then ranking informed by them, then notifications, then Shared Storylines. Each
            waits for the one before it.
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Home',
      title: 'Home without an engagement machine',
      body: (
        <>
          <p>
            Home starts from Moments the server has already put in time order. Pure chronology has a failure: one person
            posts five photos from a weekend and becomes the only person on Tembo for a whole screen.
          </p>
          <Sequence
            rows={[
              { label: 'Chronology', items: ['A', 'A', 'A', 'A', 'A', 'B', 'C'] },
              { label: 'Home', items: ['A', 'B', 'C', 'A', 'A'] },
            ]}
            note="When B and C are already in the loaded page, Home brings them forward."
          />
          <p>
            <Hl>Home adds bounded diversity without turning the feed into an engagement-ranking system.</Hl> Inside the
            page it has loaded, it prefers a different Storyline, then a different person, over another repeat. Every few
            Moments it adds four Storylines to discover, also chosen to avoid repeating creators when alternatives are
            already there.
          </p>
          <p>
            The constraints mattered more than the rule. There is no global scoring, only local choice within a bounded
            window. Loading the next page never reshuffles what someone has already seen. Every Moment still appears
            exactly once. The Following tab stays strictly chronological, and following someone is never a ranking
            signal.
          </p>
          <DeepLink to={temboHome} />
        </>
      ),
    },
    {
      kind: 'media',
      wide: true,
      items: [{ slot: 'Home: a run of Moments from different people, then a Storyline discovery block', ratio: '16/9' }],
    },
    {
      kind: 'section',
      kicker: 'Privacy',
      title: 'Privacy follows the product model',
      body: (
        <>
          <p>
            Once the Storyline is the social object, privacy can’t be a setting on each post. It follows the hierarchy.
          </p>
          <Sequence arrow rows={[{ label: 'Who can see', items: ['Account', 'Storyline', 'Moment', 'Media'] }]} />
          <p>
            The account sets the maximum audience. A Storyline inherits it by default and may narrow it, but never
            broaden it. Moments inherit their Storyline, and photos follow the same decision. Narrowing the account caps
            a Storyline’s setting without erasing it, so widening the account again restores what the owner chose.
          </p>
          <p>
            This is a product rule and a backend invariant. One authorization decision sits behind every feed, profile
            and photo request. Photos made it concrete: the app never receives credentials for the image storage. Each
            new photo request goes through Tembo and is checked again, so making a Storyline private affects the very
            next request instead of waiting for a link to expire.
          </p>
          <DeepLink to={temboPrivacy} />
        </>
      ),
      media: { slot: 'Privacy inheritance: Account, Storyline, Moment, Media', ratio: '16/9' },
    },
    {
      kind: 'section',
      kicker: 'Shipping',
      title: 'Shipping changed the definition of done',
      body: (
        <>
          <p>Tembo is live on the App Store. Android is in Google Play closed testing.</p>
          <p>
            Working on my phone stopped being the bar. A real social app needed Apple and Google sign-in, privacy
            enforced on the server, photo moderation, report and block, account deletion that actually removes your
            content, a media lifecycle, analytics, error monitoring, CI, store compliance, and testing on real devices.
            Every change now runs typecheck, lint, app tests, database tests and Edge Function tests before it merges.
          </p>
          <p>
            Small things changed too. The photo composer hands control back the moment your part is done. Upload,
            moderation and publishing carry on behind it. Production errors in Sentry reshaped sign-in into typed
            failures with their causes kept, cancellation treated as normal, one attempt at a time, and sensitive data
            redacted before anything is reported.
          </p>
        </>
      ),
    },
    {
      kind: 'media',
      items: [
        { slot: 'Tembo on the App Store', ratio: '3/4' },
        { slot: 'Photo Moment composer', ratio: '3/4' },
        { slot: 'A Moment publishing in the background', ratio: '3/4' },
      ],
    },
    {
      kind: 'section',
      kicker: 'Android sign-in',
      title: 'Inspect the artifact',
      body: (
        <>
          <p>
            On Android, the Google account picker worked, then sign-in failed before the request ever reached the
            backend. The OAuth setup looked right: both signing certificates Play Console shows were registered.
          </p>
          <p>
            Pulling the installed app off a device and reading its signatures showed a third: an older V3 certificate
            Play keeps for compatibility, and the one Google’s sign-in check was actually using. Registering its SHA-1
            fixed sign-in immediately. No code changed.
          </p>
        </>
      ),
    },
    {
      kind: 'insight',
      label: 'Insight',
      statement: 'When platform configuration and the artifact disagree, inspect the artifact.',
    },
    {
      kind: 'section',
      kicker: 'Architecture',
      title: 'Building only the scale I could justify',
      body: (
        <>
          <p>
            Tembo is a modular monolith: React Native and Expo in TypeScript, Supabase Auth and Postgres, database
            functions for anything that must be authoritative, and a few Edge Functions where a trusted server has to
            talk to Apple, Cloudflare or a moderation service. TanStack Query, PostHog, Sentry and EAS do the rest.
          </p>
          <p>
            There is no Redis, Kafka, microservices, realtime layer, graph database or separate search. Simple isn’t
            automatically better. None of those had evidence behind them yet.
          </p>
          <p>
            Capacity testing found the one place that did. Storyline discovery slowed as Moments grew, about ten times
            slower on a dataset about eleven times larger. I redesigned the data model so each Storyline keeps a pointer
            to its latest Moment, and discovery stopped scanning Moments to find it. I certified the new version on a
            synthetic dataset before merging. <Hl>These are capacity-test results, not Tembo’s real user scale.</Hl>
          </p>
          <p>
            I used Claude Code and Cursor extensively in implementation, while I owned product decisions, specifications,
            review, testing and release.
          </p>
        </>
      ),
    },
    {
      kind: 'outcomes',
      kicker: 'Synthetic capacity test',
      items: [
        { value: '~110×', label: 'Growth in the synthetic Moment corpus, to 101,904' },
        { value: '4.52 → 4.42 ms', label: 'Median discovery query as it grew' },
        { value: '0', label: 'Pagination duplicates, gaps or wrong results' },
        { value: '0%', label: 'Request errors through 100 virtual users' },
      ],
    },
    {
      kind: 'section',
      kicker: 'Status',
      title: 'Live, not validated',
      body: (
        <>
          <p>
            Tembo is live, productionized and early. <Hl>Live is not the same as validated.</Hl> I don’t
            have evidence of retention, organic growth or network effects, and this page doesn’t imply them.
          </p>
          <p>
            What shipping settled is narrower. The open question used to be whether I could define, design and ship this
            product. Now it is whether enough people will adopt Storyline-based sharing for Tembo to become a network.
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Lessons',
      title: 'What I learned',
      body: (
        <Points
          items={[
            {
              label: 'The primitive does the design work.',
              body: 'Once the Storyline was the object, following, privacy and Home each had an obvious shape.',
            },
            { label: 'Scope is a design decision.', body: 'What the first version leaves out decides what it can teach you.' },
            { label: 'Evidence should earn infrastructure.', body: 'I added complexity where a test proved I needed it, and nowhere else.' },
          ]}
        />
      ),
    },
  ],
};
