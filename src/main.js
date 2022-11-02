import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import installElementPlus from './plugins/element'
import installElementPlusIcon from './plugins/elementIcon'
import './assets/css/icon.css'
import hljs from 'highlight.js'
import VueKonva from 'vue-konva'
import 'highlight.js/styles/atom-one-dark.css'
import App from './App.vue' // 样式

const app = createApp(App)
app.use(VueKonva, { prefix: 'k' })
// 创建v-highlight全局指令
app.directive('highlight', function (el) {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightElement(block)
  })
})
installElementPlus(app)
installElementPlusIcon(app)
app.use(createPinia()).use(router).mount('#app')
