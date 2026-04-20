import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon/favicon.svg', 'favicon/favicon-192x192.png', 'favicon/favicon-512x512.png'],
      manifest: {
        name: '경필 — 누구나 읽는 불경',
        short_name: '경필',
        description: '한문 불경을 현대 한국어 수필로 만나다. 45종 경전을 쉽게 읽고, 듣고, 함께 이야기 나눠요.',
        theme_color: '#2C1810',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/favicon/favicon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicon/favicon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        // 앱 셸 및 정적 에셋 precache
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}'],
        // sutra.db, wasm은 크기가 크므로 런타임 캐시 (CacheFirst)
        runtimeCaching: [
          {
            urlPattern: /\/sutra\.db$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'sutra-db',
              expiration: { maxEntries: 1, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            urlPattern: /\/sql-wasm\.wasm$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'sql-wasm',
              expiration: { maxEntries: 1, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
  ],
  root: '.',
  publicDir: '../public',
  base: process.env.VITE_BASE ?? '/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': '/Users/user/ws/buddhist-app/webapp',
    },
  },
})
