import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import App from './app/App.tsx';
import { CaseStudyPage } from './app/pages/CaseStudyPage.tsx';
import { AboutPage } from './app/pages/AboutPage.tsx';
import { ImpactPage } from './app/pages/ImpactPage.tsx';
import { ResumePage } from './app/pages/ResumePage.tsx';
import { NotFoundPage } from './app/pages/NotFoundPage.tsx';
import './styles/index.css';

/**
 * Case studies live at /works/<slug>, matching the existing public URLs on
 * masachidc.com. Short /projects/<slug> URLs from earlier builds redirect.
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
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/works" element={<Navigate to="/#work" replace />} />
        <Route path="/works/:slug" element={<CaseStudyPage />} />
        <Route path="/projects/:slug" element={<LegacyProjectRedirect />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </MotionConfig>
);
