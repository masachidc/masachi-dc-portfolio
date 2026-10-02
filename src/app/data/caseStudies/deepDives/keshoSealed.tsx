import { Hl, Points } from '../../../components/caseStudy';
import type { DeepDive } from '../types';

// Source: KESHO repo (predictions route, schema constraints, lock/reveal crons, lib/reveal.ts, PredictionPostCard).
// Kept at the level of design decisions: no security-sensitive implementation detail.
export const keshoSealed: DeepDive = {
  parent: 'kesho-app',
  slug: 'making-sealed-true',
  title: 'Making “sealed” true',
  dek: 'KESHO’s promise fit in one sentence. Keeping it took a rule at every layer of the stack.',
  description:
    'How KESHO enforced sealed predictions: a server-side kickoff gate, write-once records, scheduled locks with recovery, and atomic reveal and grading.',
  blocks: [
    {
      kind: 'section',
      kicker: 'The promise',
      title: 'What sealed had to mean',
      body: (
        <>
          <p>A sealed Call made five promises to the person who made it and to everyone who saw it.</p>
          <Points
            bar
            items={[
              { label: 'It existed before kickoff.', body: 'Measured by the server, not by anyone’s phone.' },
              { label: 'It never changed.', body: 'No edits and no deletes, before or after the result.' },
              { label: 'It locked on time.', body: 'Even if a scheduled job failed.' },
              { label: 'It was graded fairly.', body: 'Everyone on a match graded from the same result, at the same time.' },
              { label: 'It couldn’t be copied.', body: 'Nobody saw your picks before they had sealed their own.' },
            ]}
          />
          <p>
            Each promise is easy to draw in a card. Each one is a different problem in the system. I tried to make every
            rule hold in more than one place, so a single bug couldn’t quietly break it.
          </p>
        </>
      ),
      media: { slot: 'Call lifecycle: submit, seal, lock, ingest result, grade, reveal', ratio: '16/9' },
    },
    {
      kind: 'section',
      kicker: 'Submission',
      title: 'The server decides what “before” means',
      body: (
        <>
          <p>
            Every submission is checked against the match’s kickoff time on the server. The client’s clock is never
            consulted, because a phone’s clock is a setting, not a fact. If kickoff has passed, the Call is refused.
          </p>
          <p>
            One Call per person per match is enforced twice: by the API, which returns a clear message, and by a unique
            constraint in Postgres, which holds even if two requests race each other.
          </p>
          <p>
            Saving a Call wrote several things at once: the Call, the post that carried it into the feed, and streak and
            XP updates. Those writes ran in one transaction. A Call either existed completely or not at all.
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Immutability',
      title: 'No edit path to protect',
      body: (
        <>
          <p>
            The simplest way to stop a record being rewritten is to have no way to rewrite it. The API had no route for
            changing a Call. The fields that define one (the pick, the score, the reasoning, the confidence) were
            write-once by design, and Calls had no soft delete.
          </p>
          <p>
            The database carried its own guard as well. A check constraint meant a Call could not be marked revealed
            unless it had first been locked. Even a bug in the reveal code couldn’t skip a step of the lifecycle.
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Lock',
      title: 'Schedule it, then assume the schedule fails',
      body: (
        <>
          <p>
            When a fixture was synced, a job was scheduled for its kickoff. At kickoff that job locked every Call on the
            match. The job only accepted authenticated callers, and running it twice did no harm.
          </p>
          <p>
            Schedulers miss things. Fixtures move, deploys interrupt, messages fail. So a recovery job looked back over
            recent kickoffs for any match that should have locked and hadn’t, and locked it. The gate at submission meant
            nobody could sneak a Call in during that gap. The recovery job made sure the record caught up.
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Reveal',
      title: 'Grade everything, or nothing',
      body: (
        <>
          <p>
            Results came from an external sports-data provider. Football data is messy: matches go to extra time and
            penalties, feeds lag, statuses change after the whistle. The reveal job polled the live feed and also
            revisited matches that had gone stale without a result.
          </p>
          <p>
            Grading was the most consequential write in the product. The winner pick was scored against the result,
            weighted by how likely that outcome looked when the match locked. Each extra pick resolved to correct, incorrect, or void.
            A player pick, for example, was voided rather than marked wrong if the data needed to grade it wasn’t there.
          </p>
          <p>
            I computed every Call’s points and XP first, then wrote all of it in a single transaction: each graded Call,
            each user’s totals, the precomputed profile stats. <Hl>A match was revealed for everyone or for no one.</Hl>{' '}
            Reveal refused to run if the match’s Calls hadn’t been locked. Notifications went out only after the
            transaction committed, in batches, so one failed email couldn’t block the rest.
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Redaction',
      title: 'Hidden until it’s fair',
      body: (
        <>
          <p>
            A sealed Call showed that you had made a Call, not what you had picked. Your own picks were always visible to
            you. Someone else’s became visible once the match locked, or once you had sealed your own Call on it.
          </p>
          <p>
            The lesson I learned the hard way: hiding picks in the interface isn’t redaction. If the data reaches the
            device, it has been shared. One incident showed sealed picks could reach the client before
            kickoff. Redaction has to happen on the server, in every response that can carry a Call, including cached
            and precomputed ones.
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Hindsight',
      title: 'What I would change',
      body: (
        <Points
          items={[
            {
              label: 'Test the lifecycle first.',
              body: 'The rules above were the most testable code in KESHO and had no automated tests. Submissions either side of kickoff, double locks, double reveals, reveal before lock, voided picks: a small suite would have caught several real incidents before users did.',
            },
            {
              label: 'Fewer copies of a Call.',
              body: 'Feed items stored a snapshot of each Call for fast reads, and caches held more. Every copy had to be patched on reveal and redacted before kickoff. Each one is another place for sealed data to leak or go stale. I would keep one source and derive views from it until load proved otherwise.',
            },
            {
              label: 'Make the lifecycle a single state.',
              body: 'Sealed, locked, and revealed were inferred from timestamps. An explicit state with allowed transitions would have made illegal moves impossible to write, not just constrained.',
            },
          ]}
        />
      ),
    },
  ],
};
