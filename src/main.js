import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css' // 样式

const app = createApp(App)
// 创建v-highlight全局指令
app.directive('highlight', function (el) {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})
installElementPlus(app)
app.use(createPinia()).use(router).mount('#app')
