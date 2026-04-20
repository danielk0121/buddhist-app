import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
