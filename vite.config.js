import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  },
  server: {
    host: true, // Needed for Railway
    port: process.env.PORT || 3000, // Use Railway's PORT or default to 3000
    proxy: {
      '/api': {
        target: 'https://web-production-1eb76.up.railway.app',
        changeOrigin: true,
      }
    }
  },
  preview: {
    host: true,
    port: process.env.PORT || 3000
  }
})
