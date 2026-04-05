import path from 'path';

import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  resolve: {
    conditions: ['import', 'module', 'browser', 'default'],
    alias: {
      '@nono-art/api': path.resolve(__dirname, '../libs/api/src'),
      '@nono-art/api-types': path.resolve(__dirname, '../libs/api-types/src'),
      '@nono-art/domain': path.resolve(__dirname, '../libs/domain/src'),
      '@nono-art/types': path.resolve(__dirname, '../libs/types/src'),
      '@nono-art/utils': path.resolve(__dirname, '../libs/utils/src'),
    },
  },
  build: {
    target: 'es2022',
    minify: 'esbuild',
    // minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules') && (id.includes('react') || id.includes('react-dom'))) {
            return 'vendor';
          }
          // Можно добавить дополнительные чанки (например, для UI-библиотек)
          // if (id.includes('@react-navigation')) return 'navigation';
        },
      },
    },
  },
  server: {
    port: 5173,
    open: false,
  },
});
