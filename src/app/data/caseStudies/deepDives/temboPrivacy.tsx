import { Hl, Points, Table } from '../../../components/caseStudy';
import type { DeepDive } from '../types';

// Source: Tembo repo (masachidc/tembo, main): docs/27 §3, §6, §9, §10; docs/18; ADR-0009; docs/CURRENT_STATE.md
// (media-delivery proxy decision); src/features/settings/screens/privacy-settings-screen.tsx and
// src/features/storylines/domain/effective-audience.ts (options offered in the app).
// Kept at the level of design decisions: no security-sensitive implementation detail.
export const temboPrivacy: DeepDive = {
  parent: 'tembo-app',
  slug: 'privacy-as-inheritance',
  title: 'Designing privacy as inheritance',
  dek: 'In Tembo, who can see something is decided once, at the top of the product’s own hierarchy, and every layer below follows it.',
  description:
    'How Tembo models privacy as inheritance from account to Storyline to Moment to media, with one authorization decision behind every feed, profile and photo request.',
  blocks: [
    {
      kind: 'section',
      kicker: 'The model',
      title: 'A ceiling, then narrowing',
      body: (
        <>
          <p>
            Tembo’s content has a shape: a person has Storylines, Storylines hold Moments, Moments carry photos. Privacy
            follows that shape instead of living on each post.
          </p>
          <Points
            bar
            items={[
              { label: 'Account', body: 'Sets the maximum audience for everything the person shares.' },
              { label: 'Storyline', body: 'Inherits the account’s audience by default. It can narrow it. It can never go wider.' },
              { label: 'Moment', body: 'Inherits its Storyline. There is no per-Moment privacy in the first version.' },
              { label: 'Media', body: 'Follows the same decision as the Moment it belongs to.' },
            ]}
          />
          <p>
            In the app this is two choices. An account is visible to Everyone or Only you. A Storyline on an Everyone
            account can stay Everyone or become Only you. A Storyline on an Only you account has nothing to widen to, so
            the app doesn’t pretend otherwise.
          </p>
          <p>
            Everyone means everyone signed in to Tembo, not the public web. Opening Storylines to the open internet would
            be a separate and much larger decision.
          </p>
        </>
      ),
      media: { slot: 'Account privacy and Storyline audience settings', ratio: '16/9' },
    },
    {
      kind: 'section',
      kicker: 'Resolution',
      title: 'Narrowing never erases intent',
      body: (
        <>
          <p>
            Effective visibility is never stored. It is derived each time as the narrower of two things: the account’s
            setting and the Storyline’s own. Because it is a minimum, a Storyline can’t broaden past its account even if
            its stored setting says it should.
          </p>
          <Table
            head={['Account', 'Storyline setting', 'Who can see it']}
            rows={[
              ['Everyone', 'Inherit', 'Everyone'],
              ['Everyone', 'Only you', 'Only you'],
              ['Only you', 'Inherit', 'Only you'],
              ['Only you', 'Only you', 'Only you'],
            ]}
          />
          <p>
            An account change never rewrites a Storyline’s setting. It only changes what that setting resolves to. Make
            the account private and every Storyline goes dark. Make it public again and each Storyline comes back exactly
            as its owner left it. <Hl>The parent narrows access. It never erases the child’s intent.</Hl>
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'One decision',
      title: 'Every read asks the same question',
      body: (
        <>
          <p>
            There is one place that decides whether a viewer can see a Storyline. Whether they can see a Moment is that
            answer plus “the Moment hasn’t been deleted.” Whether they can see a photo is the Moment’s answer. The owner
            always sees their own content.
          </p>
          <p>
            Home, Following, profiles, Storyline pages and photo delivery all call into that decision. None of them has
            its own interpretation of privacy, and row-level security in Postgres holds the same line underneath. Blocks
            and account deletion are checked on the same read paths.
          </p>
          <p>
            That is what made privacy testable. A capacity test walked every page of Home for viewers with private
            accounts and a block in place, and found no content that should have been hidden.
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Media',
      title: 'No credential to outlive a decision',
      body: (
        <>
          <p>
            Photos are where privacy usually leaks. The common approach hands the app a signed link to the image that
            works for a few minutes. Tembo’s image storage, Cloudflare, can’t revoke one image’s signed link before it
            expires. A short-lived link is still a key for its whole lifetime.
          </p>
          <p>
            So the app never receives Cloudflare credentials at all. Every photo request goes to Tembo, which checks
            authorization fresh, fetches the image privately, and returns it uncached. Making a Storyline private or
            deleting a Moment denies the very next request.
          </p>
          <p>
            There are two honest limits. A photo already downloaded to a device stays there. And every image now passes
            through Tembo’s server with no CDN caching, which is slower and costs more. That trade is fine at today’s
            scale, and it is marked for revisiting as Home gets denser.
          </p>
        </>
      ),
      media: { slot: 'Photo request: app → Tembo authorization → private image storage', ratio: '16/9' },
    },
    {
      kind: 'section',
      kicker: 'Moderation',
      title: 'Checked before anyone sees it',
      body: (
        <p>
          Every photo is moderated before its Moment is published. Tembo’s server fetches the image itself and sends it
          for assessment directly, so no image link ever leaves the system for moderation. The provider returns signals.
          The allow, review and block policy lives in Tembo. A photo held for review never quietly appears.
        </p>
      ),
    },
    {
      kind: 'section',
      kicker: 'Deletion',
      title: 'Stronger than privacy',
      body: (
        <p>
          Deleting an account outranks every privacy setting. The moment the request is accepted, the person and
          everything they own become unavailable on every surface, to every viewer, including the person who asked.
          Removing the stored photos happens afterwards, but access is already gone before that cleanup starts.
        </p>
      ),
    },
    {
      kind: 'section',
      kicker: 'Circle',
      title: 'A seam the app doesn’t offer yet',
      body: (
        <>
          <p>
            The model has a third audience between Everyone and Only you: Circle. It is reserved for a future social
            layer, and its meaning hasn’t been decided. Right now nothing is in anyone’s Circle, so a Circle Storyline
            would be visible only to its owner.
          </p>
          <p>
            An earlier build offered it anyway, and I removed it from both pickers. A privacy option should
            never promise an audience the product can’t enforce. The data model keeps the slot, so when Circle gets real
            semantics, stored settings start working without a migration.
          </p>
          <p>
            The same thinking separates who can see a Storyline from who can add to it. Today only the owner adds
            Moments, but the model doesn’t assume those are the same question. Shared Storylines will need them apart.
          </p>
        </>
      ),
    },
  ],
};
