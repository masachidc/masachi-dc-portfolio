import { ArrowLeft } from 'lucide-react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { SiteLink } from '../components/SiteLink';
import { usePageMeta } from '../lib/usePageMeta';

export function NotFoundPage() {
  usePageMeta({ title: 'Page not found', noindex: true });

  return (
    <div className="relative flex min-h-screen flex-col bg-bone font-sans">
      <Nav />
      <main id="main" tabIndex={-1} className="container-site flex-1 pb-32 pt-20 focus:outline-none lg:pt-28">
        <p className="mb-4 font-mono text-label text-accent-deep">404</p>
        <h1 className="max-w-[16ch] font-display text-display text-ink">This page doesn't exist.</h1>
        <p className="mt-6 max-w-[46ch] text-body-lg text-fg-muted">
          The link may be old, or the page may have moved. The work is still here.
        </p>
        <SiteLink href="/#work" className="mt-10 inline-flex items-center gap-2 py-2 text-label caps text-ink">
          <ArrowLeft size={14} strokeWidth={2} aria-hidden />
          See the work
        </SiteLink>
      </main>
      <Footer />
    </div>
  );
}
