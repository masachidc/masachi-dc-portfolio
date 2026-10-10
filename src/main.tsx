import { lazy, Suspense, type ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { HomePage } from './app/pages/HomePage.tsx';
import { DISCIPLINES, disciplineHref } from './app/data/disciplines.ts';
import './styles/index.css';

const RELOADED_KEY = 'chunk-reload';

/** Storage can throw (blocked site data); then the page never auto-reloads, so it can't loop. */
function markReloaded() {
  try {
    if (sessionStorage.getItem(RELOADED_KEY)) return false;
    sessionStorage.setItem(RELOADED_KEY, '1');
    return true;
  } catch {
    return false;
  }
}

function clearReloaded() {
  try {
    sessionStorage.removeItem(RELOADED_KEY);
  } catch {
    // nothing to clear
  }
}

/**
 * Route-level code splitting: the homepage ships in the entry bundle; every other page (and the case-study content
 * behind it) loads on first visit. A tab left open across a deploy asks for chunk files that no longer exist, so a
 * failed load reloads the page once to pick up the current build.
 */
function lazyPage<K extends string>(load: () => Promise<Record<K, ComponentType<any>>>, name: K) {
  return lazy(() =>
    load().then(
      (module) => {
        clearReloaded();
        return { default: module[name] };
      },
      (error) => {
        if (markReloaded()) {
          window.location.reload();
          return new Promise<never>(() => {});
        }
        throw error;
      },
    ),
  );
}

const CaseStudyPage = lazyPage(() => import('./app/pages/CaseStudyPage.tsx'), 'CaseStudyPage');
const DeepDivePage = lazyPage(() => import('./app/pages/DeepDivePage.tsx'), 'DeepDivePage');
const AboutPage = lazyPage(() => import('./app/pages/AboutPage.tsx'), 'AboutPage');
const ImpactPage = lazyPage(() => import('./app/pages/ImpactPage.tsx'), 'ImpactPage');
const ResumePage = lazyPage(() => import('./app/pages/ResumePage.tsx'), 'ResumePage');
const DisciplinePage = lazyPage(() => import('./app/pages/DisciplinePage.tsx'), 'DisciplinePage');
const NotFoundPage = lazyPage(() => import('./app/pages/NotFoundPage.tsx'), 'NotFoundPage');

/**
 * Case studies live at /works/<slug>, matching the existing public URLs on
 * masachidc.com, with deep dives at /works/<slug>/<article>. Short /projects/<slug> URLs from earlier builds redirect.
 */
const LEGACY_PROJECT_SLUGS: Record<string, string> = {
  amuse: 'amuse-art-museum',
  kesho: 'kesho-app',
  inline: 'inline-chrome-extension',
  seeds: 'project-seeds-branding',
  hulk: 'the-incredible-hulk',
  'stem-x': 'stemxposure',
};

function LegacyProjectRedirect() {
  const { slug = '' } = useParams();
  return <Navigate to={`/works/${LEGACY_PROJECT_SLUGS[slug] ?? slug}`} replace />;
}

createRoot(document.getElementById('root')!).render(
  // Honor the OS "reduce motion" setting across every Motion animation.
  <MotionConfig reducedMotion="user">
    <BrowserRouter>
      {/* Shown only when a lazy page is the first page loaded; in-app navigation keeps the current page until the next is ready. */}
      <Suspense fallback={<div className="min-h-screen bg-bone" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/works" element={<Navigate to="/#work" replace />} />
          <Route path="/works/:slug" element={<CaseStudyPage />} />
          <Route path="/works/:slug/:article" element={<DeepDivePage />} />
          <Route path="/projects/:slug" element={<LegacyProjectRedirect />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/resume" element={<ResumePage />} />
          {DISCIPLINES.map((d) => (
            <Route key={d.slug} path={disciplineHref(d)} element={<DisciplinePage discipline={d} />} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </MotionConfig>
);
