import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './app/App.tsx';
import { AmuseProjectPage } from './app/pages/AmuseProjectPage.tsx';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/projects/amuse" element={<AmuseProjectPage />} />
    </Routes>
  </BrowserRouter>
);
