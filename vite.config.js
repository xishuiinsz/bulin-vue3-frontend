import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
const { resolve } = require('path');

export default defineConfig({
  base: './',
  plugins: [vue(), vueJsx()],
  optimizeDeps: {
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
      {
        find: '@a',
        replacement: resolve(__dirname, 'src/assets'),
      },
      {
        find: '@c',
        replacement: resolve(__dirname, 'src/components'),
      },
      {
        find: '@i',
        replacement: resolve(__dirname, 'src/api'),
      },
      {
        find: '@u',
        replacement: resolve(__dirname, 'src/utils'),
      },
      {
        find: '@v',
        replacement: resolve(__dirname, 'src/views'),
      },
    ],
  },
  server: {
    host: 'localhost.bulin.com',
    port: 8080,
    hmr: true,
    proxy: {
      '/api': {
        target: 'http://localhost.bulin.com:3000',
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/api/, '');
        },
      },
    },
  },
});
