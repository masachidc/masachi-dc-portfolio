/**
 * Writes each route's <head> tags (title, description, canonical, Open Graph,
 * X card) into its own static HTML after `vite build`. Crawlers and link
 * unfurlers don't run JS, so without this every URL would unfurl as the homepage.
 * Vercel serves dist/<route>.html at /<route> (cleanUrls); the SPA takes over on load.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';

const DIST = path.resolve('dist');
const START = '<!-- head:start -->';
const END = '<!-- head:end -->';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function renderHead({ title, canonical, tags }) {
  return [
    `<title>${esc(title)}</title>`,
    `<link rel="canonical" href="${esc(canonical)}" />`,
    ...tags.map(([attr, key, content]) => `<meta ${attr}="${key}" content="${esc(content)}" />`),
  ].join('\n    ');
}

const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom', logLevel: 'error' });
try {
  const { buildHead } = await vite.ssrLoadModule('/src/app/lib/head.ts');
  const { PRERENDER_ROUTES } = await vite.ssrLoadModule('/src/app/lib/prerenderRoutes.ts');

  const template = await readFile(path.join(DIST, 'index.html'), 'utf8');
  const start = template.indexOf(START);
  const end = template.indexOf(END);
  if (start === -1 || end === -1) throw new Error(`index.html is missing the ${START} … ${END} markers`);

  for (const { path: route, meta } of PRERENDER_ROUTES) {
    const html = `${template.slice(0, start)}${START}\n    ${renderHead(buildHead(route, meta))}\n    ${template.slice(end)}`;
    const file = path.join(DIST, route === '/' ? 'index.html' : `${route.slice(1)}.html`);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html);
  }
  console.log(`prerender-head: wrote ${PRERENDER_ROUTES.length} routes`);
} finally {
  await vite.close();
}
