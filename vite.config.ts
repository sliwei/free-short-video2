/// <reference types="vitest" />

import tailwindcss from '@tailwindcss/vite'
import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { join } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': join(__dirname, 'src')
    }
  },
  plugins: [react(), tailwindcss(), legacy()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts'
  },
  server: {
    port: 8100,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://192.168.125.116:3000',
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/videos': {
        target: 'http://192.168.125.116:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/videos/, '')
      }
    }
  }
})
