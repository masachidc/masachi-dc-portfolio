import { defineConfig } from 'vite'
import path from 'path'
import { createHash } from 'crypto'
import { readFileSync } from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Versions the og:image URL by content, so LinkedIn and X refetch it when it changes.
const ogImageVersion = createHash('sha256')
  .update(readFileSync(path.resolve(__dirname, 'public/og-image.png')))
  .digest('hex')
  .slice(0, 16)

export default defineConfig({
  define: {
    __OG_IMAGE_VERSION__: JSON.stringify(ogImageVersion),
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
