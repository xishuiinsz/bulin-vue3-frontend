import hljs from 'highlight.js'
export default (app) => {
  // 创建v-highlight全局指令
  app.directive('highlight', function (el) {
    const blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
      hljs.highlightElement(block)
    })
  })
}
