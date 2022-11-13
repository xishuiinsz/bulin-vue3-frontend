import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
const { resolve } = require('path')

export default defineConfig({
  base: './',
  plugins: [vue(), vueJsx()],
  optimizeDeps: {
    include: ['schart.js']
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  },
  server: {
    host: 'windows10.microdone.cn',
    port: 8080,
    hmr: true,
    proxy: {
      '/api': {
        target: 'http://windows10.microdone.cn:3000',
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/api/, '')
        }
      }
    }
  }
})
