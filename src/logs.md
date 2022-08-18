*2022-08-18*
#### 新特性

- 在vue3中解析markdown文件
  - 基于marked、highlight.js等插件,
  - 摘录代码如下
  ```javascript
  import { marked } from 'marked'
  import logsMarkdown from '@/logs.md?raw'
  const logs = ref('')
  onMounted(() => {
      logs.value = marked(logsMarkdown)
    })
  ```