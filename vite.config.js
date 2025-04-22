import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Simple production mode configuration
      jsxRuntime: 'automatic'
    })
  ],
  base: '/',
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: true,
      },
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'crypto': 'crypto-browserify'
    },
  },
  define: {
    // This is the most important part for React production mode
    'process.env.NODE_ENV': '"production"',
    // Add this to ensure it's also available in browser
    'import.meta.env.NODE_ENV': '"production"'
  },
});