import { Bullets, Hl, Points } from '../../../components/caseStudy';
import type { DeepDive } from '../types';

// Source: KESHO repo (capacitor.config.ts, docs/internal/DEBUG_NATIVE.md, DEBUG_AUTH.md, DEBUG_MAC_DAY.md,
// APP_REVIEW_NOTES.md). General guidance is framed as my judgment, not as a claim about Capacitor itself.
export const keshoCapacitor: DeepDive = {
  parent: 'kesho-app',
  slug: 'shipping-with-capacitor',
  title: 'Shipping KESHO with Capacitor: what I would do differently',
  dek: 'Capacitor did its job. Both apps built and both reached review. The mistake was what I asked it to carry, and when.',
  description:
    'Lessons from shipping a Next.js product to iOS and Android with Capacitor: auth in WebViews, remote vs bundled apps, deep links, testing, and when to choose it.',
  blocks: [
    {
      kind: 'section',
      kicker: 'Setup',
      title: 'A native shell around a live website',
      body: (
        <>
          <p>
            KESHO was a Next.js app deployed on Vercel. For the stores, I wrapped it in Capacitor. The iOS and Android
            apps were native shells whose WebView loaded the production site, with plugins for push notifications,
            sharing, haptics, the status bar, the splash screen, network state, the system browser, and native Google
            sign-in.
          </p>
          <p>
            The upside was real. Most fixes shipped with a normal web deploy and reached the apps without a new binary or
            a new review. Android reached Google Play closed testing. iOS was submitted to the App Store, and the
            rejection that came back was about World Cup branding, not about the app being built with Capacitor.
          </p>
          <p>
            So this isn’t a story about a tool failing. It’s about cost. Almost every hard problem lived in the seams
            between the web app and the platforms around it.
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Fit',
      title: 'When Capacitor is a good choice',
      body: (
        <>
          <Bullets
            items={[
              'You already have a solid web app, and the mobile app is mostly the same screens.',
              'The product is content, forms, and lists rather than gestures, animation, or heavy device work.',
              'You need store presence, push, or a home-screen icon more than you need native feel.',
              'Your team is web-first and can’t sustain a separate native codebase.',
            ]}
          />
          <p>And it becomes the wrong abstraction when:</p>
          <Bullets
            items={[
              'The hardest parts of the product are platform behavior: sign-in, deep links, background work, process lifecycle.',
              'You’re using it to postpone a decision between web and native rather than to make one.',
              'The app is little more than a wrapped website. Store reviewers look hard at those.',
            ]}
          />
          <p>KESHO’s hardest parts were the first item on that second list.</p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Auth',
      title: 'Sign-in is where WebViews hurt',
      body: (
        <>
          <p>Sign-in took more iterations than any other part of the native work. The path, in order:</p>
          <Points
            items={[
              {
                label: 'Google refuses embedded WebViews.',
                body: 'Signing in with Google inside the app’s WebView was rejected outright. Google blocks OAuth from embedded browsers, so the flow had to leave the WebView.',
              },
              {
                label: 'Handing off to the browser breaks state.',
                body: 'Sending the user to the system browser and back via a deep link works, but PKCE needs a verifier generated before the trip to still exist after it. On Android, the OS sometimes killed the app while the user was in the browser. The verifier went with it, and the returning sign-in failed.',
              },
              {
                label: 'Coming back is its own problem.',
                body: 'The deep link fired, but the session didn’t persist, because the WebView and the system browser don’t share cookies or storage.',
              },
              {
                label: 'Native first.',
                body: 'The stable Android answer was native Google sign-in that returns an ID token, exchanged directly with the auth provider. No browser round-trip, no state to lose. Apple sign-in on iOS still used the browser fallback.',
              },
            ]}
          />
          <p>
            In the middle of this I also moved auth from Clerk to Supabase Auth. An auth abstraction I had built earlier
            meant app code didn’t change. The native flows did.
          </p>
          <p>
            <Hl>If you ship Capacitor with sign-in, design for native auth from day one.</Hl> Use the platform SDKs,
            exchange tokens server-side, keep any state that must survive a handoff in durable storage, and test what
            happens when the OS kills the app halfway through.
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Remote vs bundled',
      title: 'Loading the live site is a trade, not a shortcut',
      body: (
        <>
          <p>
            Pointing the shell at the production URL gave KESHO instant fixes. It also meant:
          </p>
          <Bullets
            items={[
              'When the site broke, the apps broke with it.',
              'Web code and native code shipped on different schedules, so a web deploy could call a plugin an installed app didn’t have yet.',
              'Offline meant a fallback page, not an app.',
              'To a reviewer, a remote shell can look like a website in a box.',
            ]}
          />
          <p>
            Bundling the web build into the binary fixes most of that, at the price of a release for every change, or a
            live-update service on top. Either can be right. The mistake is drifting into one without deciding.
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Deep links',
      title: 'One door into the app',
      body: (
        <>
          <p>
            Deep links had three failure modes. Verified links on Android only work on https hosts with a published
            association file, and I first marked a custom URI scheme as verified, which does nothing. Links behave
            differently when the app is cold-started versus already open. And the link handler could fire before the
            router was ready, so navigation raced app startup.
          </p>
          <p>
            What I would do now: a single entry point that receives every incoming URL, queues it until the app has
            finished starting, then routes it. Auth callbacks, shared Call links, and notifications all come through the
            same door.
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Testing',
      title: 'Real devices, every native change',
      body: (
        <>
          <p>
            Most native bugs in KESHO only appeared on real devices: memory pressure on one Android phone, and an iOS build
            failing in CI on package resolution.
          </p>
          <p>Before any native release I would now run a short scripted check on a real iPhone and Android phone:</p>
          <Bullets
            items={[
              'Fresh install, sign up, sign in, sign out, sign in again',
              'Kill the app mid sign-in, return, confirm recovery',
              'Open a deep link with the app closed, then with it open',
              'Receive and open a push notification',
              'Update from the previous build without losing the session',
            ]}
          />
          <p>Then automate the sign-in path first, because that is where most of the time went.</p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'Today',
      title: 'What I would choose now',
      body: (
        <>
          <p>
            For KESHO at the evidence level it had, I would have stayed on the mobile web, installable as a web app,
            until the beta showed that people came back. The store work began before there was meaningful beta evidence,
            and the product didn’t need it to learn what it needed to learn.
          </p>
          <p>
            Once native was justified, I would still consider Capacitor for a web-first team. I would bundle the web
            build, use native auth SDKs from the start, keep the plugin list short, and budget release time as real
            work. If the product’s core were native interaction rather than screens of content, I would pick a native
            or React Native stack instead.
          </p>
          <p>
            Capacitor didn’t fail. I asked it to carry a mobile launch before the product had earned one.
          </p>
        </>
      ),
    },
  ],
};
