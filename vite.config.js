import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')

export default {
  base: './',
  plugins: [vue()],
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
    host: 'localhost.china.com'
  }
}
