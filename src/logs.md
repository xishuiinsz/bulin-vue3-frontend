### 2024-09-22

- [x] 通过拦截Echarts实例中setOption方法来实现图表中字体大小与屏幕大小自适应的能力。
  - demo 路径：左侧菜单 - 练习场 - echarts中Tip引入Vue组件
  - 组件路径: **src\views\EchartsAndVue\EchartsAndVue.vue**
  - 通用逻辑: **src\echarts\index.js**
  
### 2024-09-20

- [x] 新增输入表单模拟器组件，尝试解决当表格中渲染大批量表单组件时不流畅的问题。
  - demo 路径：左侧菜单 - 练习场 - 表格中渲染大量输入框
  - 组件路径: **src\pages\massInputsInTable\InputSimulator.vue**
  
### 2024-08-18

- [x] 新增命令式 ElDrawer 能力
  - demo 路径：左侧菜单 - 基础表格 - 【用户名】列
  - 组件路径: **src\imperatives\showDrawer.js**

### 2024-07-27

- [x] 数据删除动画
  - demo 路径：左侧菜单 - 练习场 - 数据删除动画
  - 组件路径: **src\pages\animationByRemEle**
  - 此 demo 需要开启**https://github.com/xishuiinsz/bulin-express.git**后台工程配合实现效果。

### 2024-07-20

- [x] 调试并封装一种文本省略号不在尾部的 UI 效果。
  - demo 路径：左侧菜单 - 练习场 - 多行文本尾部的加载更多
  - 组件路径: **src\imperatives\src\components\loadMoreAfterTail.vue**

### 2024-07-14

- [x] 优化命令式 ElTooltip 能力
  - demo 路径：左侧菜单 - 练习场 - js 调用 Tooltip
  - 组件路径: **src\imperatives\showTooltip.js**
  - 优化【消除body上的zoom导致的tooltip错位】- 20240828

### 2024-07-13

- [x] 优化命令式 ElDialog 能力
  - js 和 jsx 版本同时提供
  - 另起 app 用来挂载 Eldialog，以确保 devTools 能调试它。 - 20240717
  - demo 路径：左侧菜单 - 基础表格 - 操作 - 编辑
  - 组件路径: **src\imperatives\showDialog.jsx**

### 2024-07-06

- [x] 优化『结构化表单』组件
  - 增加表单项校验能力
  - 补充作用域插槽能力
  - 将【重置】表单的能力挂载在表单实例上。
  - demo 路径：左侧菜单 - 表单相关 - 结构化表单
  - 组件路径: **src\components\structuredForm\entry.jsx**

### 2024-07-05

- [x] 卡片化 el-table 表格组件，某项目组的需求从标准化的 table 变更为卡片化的 table.
  - 完善了卡片化风格，借用 el-table--scrollable-y 类名、has 伪类选择器实现了分页器的动态 shadow 效果。- 20240726
  - demo 路径：左侧菜单 - 练习场 - 卡片化表格
  - 组件路径: **src\assets\css\el-table.scss**

### 2024-07-04

- [x] 新增基于**src\pages**文件夹结构自动生成路由条目之能力
  - 相关代码路径: **src\router\index.js**

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
