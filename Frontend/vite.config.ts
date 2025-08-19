import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  // base: '/app/wearther/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve('./src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: '_worker.js'
      }
    }
  }
});
