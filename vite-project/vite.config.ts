import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// Removed unused import of tailwindcss
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
});