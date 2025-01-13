// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://django-react-notes-app-production-0e6b.up.railway.app/',
//         changeOrigin: true,
//       }
//     }
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // This ensures the built files end up in a directory Django can serve
    outDir: 'dist',
    // This matches your Django static URL configuration
    assetsDir: 'assets',
    // This is important for Django to find the index.html
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/api': {
        // For development only - you might want to change this to localhost:8000 when developing
        target: 'https://django-react-notes-app-production-0e6b.up.railway.app/',
        changeOrigin: true,
      }
    }
  }
})