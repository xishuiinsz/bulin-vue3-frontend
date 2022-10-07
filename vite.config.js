import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
const { resolve } = require('path')

export default {
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
    // host: 'localhost.china.com',
    port: 8080
  }
}
