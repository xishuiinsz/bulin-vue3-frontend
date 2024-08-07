import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
export default defineConfig({
  base: './',
  plugins: [vue(), vueJsx()],
  optimizeDeps: {},
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
        find: '@h',
        replacement: resolve(__dirname, 'src/hooks'),
      },
      {
        find: '@i',
        replacement: resolve(__dirname, 'src/api'),
      },
      {
        find: '@p',
        replacement: resolve(__dirname, 'src/pages'),
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
    // 配置 Vite 如何解析自定义扩展
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    // 指定 tsconfig 文件
    typescript: {
      tsconfig: './tsconfig.json',
    },
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
      '/map': {
        target: 'https://geo.datav.aliyun.com',
        changeOrigin: true,
        bypass(req, res, options) {
          const proxyURL = options.target + options.rewrite(req.url);
          console.log('proxyURL: ', proxyURL);
        },
        rewrite: (path) => {
          return path.replace(/^\/map/, '');
        },
      },
    },
  },
});
