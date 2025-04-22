import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  return {
    plugins: [
      react({
        // Force React to production mode when building for production
        babel: {
          plugins: [
            isProduction && ['transform-react-remove-prop-types', { removeImport: true }]
          ].filter(Boolean)
        }
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
      'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development')
    },
  };
});