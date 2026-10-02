import { Hl, Points, Sequence, Table } from '../../../components/caseStudy';
import type { DeepDive } from '../types';

// Source: Tembo repo (masachidc/tembo, main): src/features/home/domain/compose-home-feed.ts and page-size.ts,
// docs/27 §8, ADR-0010, docs/perf/storyline-discovery/PRODUCTION_CERTIFICATION.md, docs/PRODUCT_ROADMAP.md.
// Capacity figures are synthetic, run on a local harness. Never present them as real usage.
export const temboHome: DeepDive = {
  parent: 'tembo-app',
  slug: 'home-without-ranking',
  title: 'Home without engagement ranking',
  dek: 'How Tembo’s Home breaks up same-creator bursts using only what it has already loaded, without scoring anyone.',
  description:
    'How Tembo’s Home feed adds bounded diversity to a chronological stream: local selection windows, a stable visible prefix, Storyline discovery, and a synthetic capacity certification.',
  blocks: [
    {
      kind: 'section',
      kicker: 'Two tabs',
      title: 'Main and Following',
      body: (
        <>
          <p>
            Home has two views. <Hl>Following</Hl> is the plain one: Moments from the Storylines you follow, newest
            first, and nothing else. It stays chronological on purpose. If you chose to follow something, you should see
            it in the order it happened.
          </p>
          <p>
            <Hl>Main</Hl> is where composition happens. It draws on two streams the server has already ordered: Moments,
            newest first, and Storylines that are currently unfolding, ordered by their latest Moment. Main weaves them
            together: a short run of Moments, then a block of four Storylines to discover, then another run.
          </p>
        </>
      ),
      media: { slot: 'Home: Main and Following tabs side by side', ratio: '16/9' },
    },
    {
      kind: 'section',
      kicker: 'The problem',
      title: 'Chronology rewards bursts',
      body: (
        <>
          <p>
            Newest-first is honest, but it has one obvious failure. Someone posts five photos from a weekend, and for the
            next screen of Home they are the only person on Tembo.
          </p>
          <Sequence
            rows={[
              { label: 'Server order', items: ['A', 'A', 'A', 'A', 'A', 'B', 'C'] },
              { label: 'Home shows', items: ['A', 'B', 'C', 'A', 'A'] },
            ]}
            note="When B and C are already in the loaded page, Home can bring them forward. It never fetches anything to do it."
          />
          <p>
            The usual fix is a ranking model that scores everything. Tembo doesn’t have the signals for that yet, and I
            didn’t want Home to become one before it had earned it. So the fix had to be local.
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'The rule',
      title: 'Prefer something different, nearby',
      body: (
        <>
          <p>
            Inside one loaded page of 12 Moments, Home fills each run by picking the candidate that repeats the least.
            Another Moment from the same Storyline as one just shown costs more than another Moment from the same
            person on a different Storyline. Anything new costs nothing. Ties keep the server’s order.
          </p>
          <p>
            Runs are three to five Moments long. If the next few candidates repeat a Storyline or a person, the run
            shortens and discovery arrives sooner. A varied stretch earns a longer run. Nothing about this is random, so
            the same input always produces the same feed.
          </p>
          <p>
            Discovery blocks follow the same instinct. Each block of four is picked from a window of eight Storylines,
            preferring creators who weren’t in the run above it or already in the block. A Storyline passed over once
            gets priority next time, so diversity can’t starve anyone indefinitely.
          </p>
        </>
      ),
      media: { slot: 'Home: a run of Moments, then a 2×2 Storyline discovery block', ratio: '3/4' },
    },
    {
      kind: 'section',
      kicker: 'Invariants',
      title: 'What the feed promises not to do',
      body: (
        <>
          <p>The selection logic is small. Most of the design went into the guarantees around it.</p>
          <Points
            bar
            items={[
              {
                label: 'No global scoring.',
                body: 'Home only reorders inside a window it has already loaded. It never changes what is eligible to be seen. The server decides that.',
              },
              {
                label: 'No reshuffling.',
                body: 'A run isn’t arranged until its whole page has arrived, and a discovery block waits for a full window of candidates. Loading more can only add below what someone has seen, never change it.',
              },
              {
                label: 'Everything once.',
                body: 'Every Moment still appears exactly once. Diversity changes position, not membership.',
              },
              {
                label: 'Following isn’t a signal.',
                body: 'Whether you follow a Storyline doesn’t affect where it lands. Following changes a flag on cached Moments, and using that flag would reorder a feed someone was already reading.',
              },
            ]}
          />
          <p>
            The composer is a pure, deterministic function with no knowledge of privacy or the database, which made these
            properties testable directly: prefix stability across page loads, exhaustion, refresh, and the memory cap that
            drops old pages.
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Discovery at scale',
      title: 'The query that grew with the corpus',
      body: (
        <>
          <p>
            Ordering Storylines by their latest Moment sounds simple. The first version found that Moment at read time,
            for every Storyline, on every request. A capacity test caught it: discovery got about ten times slower on a
            dataset about eleven times larger, and under load it slowed the other Home queries too.
          </p>
          <p>
            The cause was structural. Paging through Storylines by recent activity needs one index that both groups by
            Storyline and sorts by time, and no index can do both. So each Storyline now keeps a maintained pointer to
            its latest eligible Moment, updated when a Moment is published or deleted and rebuildable from scratch.
            Discovery reads the pointer and touches the Moments table only to fetch the handful it shows.
          </p>
          <p>
            It is the one place Tembo stores a derived value instead of computing it. I wrote down why, so it couldn’t
            become precedent for denormalizing everything else.
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Certification',
      title: 'Flat as the corpus grew',
      body: (
        <>
          <p>
            Before merging, I certified the redesign on an isolated harness with a synthetic dataset: 620 users, 2,499
            Storylines, and 101,904 Moments, with a mix of public, private and narrowed Storylines.{' '}
            <Hl>These are capacity-test results, not Tembo’s real user scale.</Hl>
          </p>
          <Table
            head={['Discovery query, 1 user', 'Moments', 'Median', 'p95']}
            rows={[
              ['Small', '920', '4.52 ms', '8.75 ms'],
              ['Medium', '9,960', '4.30 ms', '5.86 ms'],
              ['Large', '101,904', '4.42 ms', '6.24 ms'],
            ]}
            note="Synthetic data on a local, single-machine harness."
          />
          <Points
            items={[
              {
                label: 'Correctness.',
                body: 'Two exhaustive pagination walks, including a viewer with a block in place, returned 0 duplicates, 0 missing, 0 extra, and 0 wrong results. Every Storyline’s maintained pointer matched a full recompute, before and after concurrent writes.',
              },
              {
                label: 'Load.',
                body: '0% request errors at every tier through 100 virtual users. Latency did climb at high concurrency. On this harness the bottleneck was the local API gateway rather than the database, so I read those numbers as a property of the test machine, not a production forecast.',
              },
            ]}
          />
        </>
      ),
      media: { slot: 'Chart: discovery latency stays flat as the synthetic corpus grows ~110×', ratio: '16/9' },
    },
    {
      kind: 'section',
      kicker: 'Next',
      title: 'Ranking, once there are signals',
      body: (
        <p>
          The roadmap does add ranking to Home, after Storyline views and Moment views and likes exist to inform it. When
          it arrives it has to sit on the same foundations: the server decides eligibility and privacy, and nothing a
          person has already seen moves.
        </p>
      ),
    },
  ],
};
