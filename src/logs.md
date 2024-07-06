### 2024-07-06

- [x] 优化『结构化表单』组件
  - 增加表单项校验能力
  - 补充作用域插槽能力
  - demo 路径：左侧菜单 - 表单相关 - 结构化表单
  - 组件路径: **src\components\structuredForm\entry.jsx**

### 2024-07-05

- [x] 卡片化 el-table 表格组件，某项目组的需求从标准化的 table 变更为卡片化的 table.
  - demo 路径：左侧菜单 - 练习场 - 卡片化表格
  - 组件路径: **src\assets\css\el-table.scss**

### 2024-07-03

- [x] 封装简易、手工版本的轮播组件
  - demo 路径：左侧菜单 - 练习场 - 走马灯
  - 组件路径: **src\pages\carouselDemo\components\multiItemsCarouse.vue**

### 2024-03-24

- [x] 基于阿里云【数据可视化平台 DataV.GeoAtlas】制作中国地图
  - 遭遇调用 JSON API 时报 403 错误，解决方法为：在 html 的请求头标签中加上<meta name=”referrer” content=”no-referrer”>
  - 以上解决方法请参考[博文](https://www.pipipi.net/20626.html)
  - 如果处理“南海诸岛”的视觉问题，参考[博文](https://blog.csdn.net/n_2021/article/details/132836912)
  - 组件组件 demo 源码：src\views\echarts\chinaMap.vue
  - 组件组件 demo 菜单路径：基础表格

### 2024-03-02

- [x] 基于 el-table，二次高度封装的结构化表格组件已基本成型。
  - 组件路径：src\components\structuredTable
  - 组件组件 demo 源码：src\views\tableBaseData
  - 组件组件 demo 菜单路径：echarts 图表 - 中国地图

### 2024-03-02

- [x] 基于 el-form，二次高度封装的结构化表单组件已基本成型。
  - 组件路径：src\components\structuredForm
  - 组件组件 demo 源码：src\views\formBaseData
  - 组件组件 demo 菜单路径：表单相关 -> 结构化表单组件

### 2024-02-16

- [ ] 使用 vue-pdf-embed(pdf 预览)的打印解决方案

### 2022-08-19

#### 新特性

- 增加对 sass 语法的支持

### 2022-08-18

#### 新特性

- 在 vue3 中解析 markdown 文件
  - 基于 marked、highlight.js 等插件,
  - 摘录代码如下
  ```javascript
  import { marked } from 'marked';
  import logsMarkdown from '@/logs.md?raw';
  const logs = ref('');
  onMounted(() => {
    logs.value = marked(logsMarkdown);
  });
  ```

### 2023-02-18

#### 新特性

- 基于 js 计算动态显示 tooltip
  - 基于@floating-ui/dom 等插件,
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
