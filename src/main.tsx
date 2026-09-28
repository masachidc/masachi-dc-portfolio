import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './app/App.tsx';
import { CaseStudyPage } from './app/pages/CaseStudyPage.tsx';
import { BlankPage } from './app/pages/BlankPage.tsx';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/projects/:slug" element={<CaseStudyPage />} />
      <Route path="/impact" element={<BlankPage title="Impact" />} />
      <Route path="/about" element={<BlankPage title="About" />} />
      <Route path="/resume" element={<BlankPage title="Resume" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
