<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="sidebar.collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-sub-menu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-sub-menu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >
                  {{ threeItem.title }}</el-menu-item
                >
              </el-sub-menu>
              <el-menu-item
                v-else
                :index="subItem.index"
                :key="subItem.index + 1"
                >{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useSidebarStore } from '../store/sidebar'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const items = [
      {
        icon: 'el-icon-lx-home',
        index: '/myComponents/dashboard',
        title: '系统首页'
      },
      {
        icon: 'el-icon-lx-cascades',
        index: '/myComponents/table',
        title: '基础表格'
      },
      {
        icon: 'el-icon-lx-cascades',
        index: '/myComponents/customerTable',
        title: '客户表格'
      },
      {
        icon: 'el-icon-lx-copy',
        index: '/myComponents/tabs',
        title: 'tab选项卡'
      },
      {
        icon: 'el-icon-lx-calendar',
        index: '3',
        title: '表单相关',
        subs: [
          {
            index: '/myComponents/form',
            title: '基本表单'
          },
          {
            index: '/myComponents/upload',
            title: '文件上传'
          },
          {
            index: '4',
            title: '三级菜单',
            subs: [
              {
                index: '/myComponents/editor',
                title: '富文本编辑器'
              },
              {
                index: '/myComponents/markdown',
                title: 'markdown编辑器'
              }
            ]
          }
        ]
      },
      {
        icon: 'el-icon-lx-calendar',
        index: '5',
        title: '练习场',
        subs: [
          {
            index: '/myComponents/sortArray',
            title: '数组冒泡排序'
          },
          {
            index: '/myComponents/getNodeById',
            title: '节点处理'
          },
          {
            index: '/myComponents/echartsAndVue',
            title: 'echarts中Tip引入Vue组件'
          }
        ]
      },
      {
        icon: 'el-icon-lx-emoji',
        index: '/myComponents/icon',
        title: '自定义图标'
      },
      {
        icon: 'el-icon-lx-weibo',
        index: '/myComponents/charts',
        title: 'schart图表'
      },
      {
        icon: 'el-icon-lx-global',
        index: '/myComponents/i18n',
        title: '国际化功能'
      },
      {
        icon: 'el-icon-lx-warn',
        index: '7',
        title: '错误处理',
        subs: [
          {
            index: '/myComponents/permission',
            title: '权限测试'
          },
          {
            index: '/myComponents/404',
            title: '404页面'
          }
        ]
      },
      {
        icon: 'el-icon-lx-redpacket_fill',
        index: '/myComponents/componentHtml',
        title: '获取组件html文本'
      }
    ]

    const route = useRoute()
    const onRoutes = computed(() => {
      return route.path
    })

    const sidebar = useSidebarStore()
    const sidebarWidth = computed(() => {
      let width = 250
      if (sidebar.collapse) {
        width = 65
      }
      return width
    })

    return {
      items,
      onRoutes,
      sidebar
    }
  }
}
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
  margin-right: 4px;
}
.sidebar > ul {
  height: 100%;
}
</style>
