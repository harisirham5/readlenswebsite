import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // Ensures all asset URLs are absolute from the site root — required for Vercel CDN
  base: '/',

  build: {
    // Copy everything from public/ into the dist root
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        team: resolve(__dirname, 'pageourteam/index.html'),
        problems: resolve(__dirname, 'pageproblemidentification/index.html'),
        engineering: resolve(__dirname, 'pageengineeringdesign/index.html'),
        requirements: resolve(__dirname, 'pagedesignrequirement/index.html'),
      },
    },
  },
})
