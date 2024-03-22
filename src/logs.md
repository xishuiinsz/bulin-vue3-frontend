### 2024-03-02
+ [x] 基于el-table，二次高度封装的结构化表格组件已基本成型。
* 组件路径：src\components\structuredTable
* 组件组件demo源码：src\views\tableBaseData
* 组件组件demo菜单路径：基础表格

### 2024-03-02
+ [x] 基于el-form，二次高度封装的结构化表单组件已基本成型。
* 组件路径：src\components\structuredForm
* 组件组件demo源码：src\views\formBaseData
* 组件组件demo菜单路径：表单相关 -> 结构化表单组件

### 2024-02-16
+ [ ] 使用vue-pdf-embed(pdf预览)的打印解决方案

### 2022-08-19
#### 新特性
- 增加对sass语法的支持

### 2022-08-18
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
### 2023-02-18
#### 新特性
- 基于js计算动态显示tooltip
  - 基于@floating-ui/dom等插件,
  - 摘录代码如下
  ```javascript
  const mouseenterHandler = ({ target }) => {
        if (target.clientWidth < target.scrollWidth) {
          const placement = 'bottom';
          const text = target.innerText;
          const tooltip = document.createElement('div');
          tooltip.className = 'el-popper is-light';
          tooltip.textContent = text;
          const arrowEl = document.createElement('div');
          arrowEl.setAttribute('data-popper-arrow', '');
          arrowEl.className = 'el-popper__arrow';
          tooltip.appendChild(arrowEl);
          document.body.appendChild(tooltip);
          target.addEventListener('mouseleave', () => {
            setTimeout(() => tooltip.remove(), 300);
          });
          function applyStyles(data) {
            const { x = 0, y = 0, strategy = 'fixed', middlewareData } = data;
            console.log(middlewareData);
            if (middlewareData.arrow) {
              const { x, y } = middlewareData.arrow;
              Object.assign(arrowEl.style, {
                left: x != null ? `${x}px` : '',
                top: y != null ? `${y}px` : '',
              });
            }
            tooltip.setAttribute('data-popper-placement', placement);
            Object.assign(tooltip.style, {
              position: strategy,
              left: `${x}px`,
              top: `${y}px`,
            });
          }
          computePosition(target, tooltip, {
            middleware: [
              offset(0),
              arrow({
                element: arrowEl,
              }),
            ],
            placement,
          }).then(applyStyles);
        }
      };
  ```