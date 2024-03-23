<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="sidebar.collapse" background-color="#324157"
      text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-sub-menu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <div @mouseenter="mouseenterHandler" class="el-menu-item-title">
                <span>{{ item.title }}</span>
              </div>
            </template>
            <template v-for="subItem in item.subs">
              <el-sub-menu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template #title>
                  <div @mouseenter="mouseenterHandler" class="el-menu-item-title">
                    {{ subItem.title }}
                  </div>
                </template>
                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                  <div class="el-menu-item-title">{{ threeItem.title }}</div>
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index + 1">
                <div class="el-menu-item-title">{{ subItem.title }}</div>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>
              <div @mouseenter="mouseenterHandler" class="el-menu-item-title">
                {{ item.title }}
              </div>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useSidebarStore } from '../store/sidebar';
import { useRoute } from 'vue-router';
import { computePosition, offset, arrow } from '@floating-ui/dom';
export default {
  setup () {
    const items = [
      {
        icon: 'el-icon-lx-home',
        index: '/myComponents/dashboard',
        title: '系统首页',
      },
      {
        icon: 'el-icon-lx-cascades',
        index: '/myComponents/table',
        title: '基础表格',
      },
      {
        icon: 'el-icon-lx-cascades',
        index: '/myComponents/customerTable',
        title: '客户表格',
      },
      {
        icon: 'el-icon-lx-copy',
        index: '/myComponents/tabs',
        title: 'tab选项卡',
      },
      {
        icon: 'el-icon-lx-calendar',
        index: '3',
        title: '表单相关',
        subs: [
          {
            index: '/myComponents/form',
            title: '结构化表单',
          },
          {
            index: '/myComponents/upload',
            title: '文件上传',
          },
          {
            index: '4',
            title: '三级菜单',
            subs: [
              {
                index: '/myComponents/editor',
                title: '富文本编辑器',
              },
              {
                index: '/myComponents/markdown',
                title: 'markdown编辑器',
              },
            ],
          },
        ],
      },
      {
        icon: 'el-icon-lx-calendar',
        index: '5',
        title: '练习场',
        subs: [
          {
            index: '/myComponents/flowChartsByCavnvas',
            title: 'html+canvas审批流程图',
          },
          {
            index: '/myComponents/imgWaterfall',
            title: '图片瀑布流',
          },
          {
            index: '/myComponents/sortArray',
            title: '数组冒泡排序',
          },
          {
            index: '/myComponents/getNodeById',
            title: '节点处理',
          },
          {
            index: '/myComponents/echartsAndVue',
            title: 'echarts中Tip引入Vue组件',
          },
          {
            index: '/myComponents/barChart',
            title: '柱状图Tip引入Vue组件',
          },
          {
            index: '/myComponents/tinymceDemo',
            title: 'tinymce富文本编辑器',
          },
          {
            index: '/myComponents/contentEditable',
            title: '当html遇上contentEditable',
          },
        ],
      },
      {
        icon: 'el-icon-lx-emoji',
        index: '/myComponents/icon',
        title: '自定义图标',
      },
      {
        icon: 'el-icon-lx-weibo',
        index: '/myComponents/charts',
        title: 'echart图表',
      },
      {
        icon: 'el-icon-lx-global',
        index: '/myComponents/i18n',
        title: '国际化功能',
      },
      {
        icon: 'el-icon-lx-warn',
        index: '7',
        title: '错误处理',
        subs: [
          {
            index: '/myComponents/permission',
            title: '权限测试',
          },
          {
            index: '/myComponents/404',
            title: '404页面',
          },
        ],
      },
    ];

    const route = useRoute();
    const onRoutes = computed(() => {
      return route.path;
    });

    const sidebar = useSidebarStore();
    const sidebarWidth = computed(() => {
      let width = 250;
      if (sidebar.collapse) {
        width = 65;
      }
      return width;
    });
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
        function applyStyles (data) {
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

    return {
      items,
      onRoutes,
      sidebar,
      mouseenterHandler,
    };
  },
};
</script>

<style scoped>
.sidebar {
  width: v-bind(sidebarWidth);
  display: block;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.el-sub-menu__title [class^='el-icon'] {
  margin-right: 5px;
  width: var(--el-menu-icon-width);
  text-align: center;
}

.sidebar>ul {
  height: 100%;
}

.el-menu-item-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-line-clamp: 1;
}
</style>
<style>
#arrow {
  width: 10px;
  height: 10px;
  position: absolute;
  background-color: red;
}
</style>
