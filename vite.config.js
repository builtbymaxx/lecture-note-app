import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the Lecture Note app. This config sets up React
// support and aliases the `@` prefix to the `src` directory so imports
// like '@/components/foo' resolve correctly.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});