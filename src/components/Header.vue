<template>
  <div class="header">
    <div class="header-left">
      <div class="logo-wrap">
        <!-- 折叠按钮 -->
        <div v-if="isShowExpandFoldIcon" class="collapse-btn" @click="collapseChage">
          <el-icon v-if="!sidebar.collapse">
            <Fold />
          </el-icon>
          <el-icon v-else>
            <Expand />
          </el-icon>
        </div>
        <div class="logo">基于Vue3的布林前端开源平台</div>
      </div>
      <div class="el-menu-wrap">
        <el-menu :default-active="topActiveMenuItem" class="el-menu-top" mode="horizontal" background-color="transparent"
          @select="handleTopMenuSelect">
          <el-menu-item index="myComponents">组件列表</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip effect="dark" :content="message ? `有${message}条未读消息` : `消息中心`" placement="bottom">
            <router-link to="/tabs">
              <el-icon>
                <Bell color="#fff" />
              </el-icon>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../assets/img/img.jpg" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <a href="https://github.com/xishuiinsz/bulin-vue3-frontend" target="_blank">
                <el-dropdown-item>项目仓库</el-dropdown-item>
              </a>
              <el-dropdown-item command="user">个人中心</el-dropdown-item>
              <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, watchEffect } from 'vue'
import { useSidebarStore } from '@/store/sidebar'
import { useRouter, useRoute } from 'vue-router'
export default {
  setup () {
    // 用户名下拉菜单选择事件
    const router = useRouter()
    const route = useRoute()
    const [pathStr] = location.hash.slice(2).split('/')
    const topActiveMenuItem = ref(pathStr || 'myComponents')
    const handleTopMenuSelect = (item) => {
      topActiveMenuItem.value = item
      router.push(`/${item}`)
    }
    const username = localStorage.getItem('ms_username')
    const message = 2

    const sidebar = useSidebarStore()
    // 侧边栏折叠
    const collapseChage = () => {
      sidebar.handleCollapse()
    }
    const isShowExpandFoldIcon = ref(true)

    onMounted(() => {
      if (document.body.clientWidth < 1500) {
        collapseChage()
      }
    })

    const handleCommand = (command) => {
      if (command === 'loginout') {
        localStorage.removeItem('ms_username')
        router.push('/login')
      } else if (command === 'user') {
        router.push('/user')
      }
    }

    return {
      isShowExpandFoldIcon,
      topActiveMenuItem,
      handleTopMenuSelect,
      sidebar,
      username,
      message,
      collapseChage,
      handleCommand,
    }
  },
}
</script>
<style scoped>
.header {
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  display: flex;
  padding-left: 20px;
}

.header .header-left {
  flex: 1;
  display: flex;
}

.header .header-left .logo-wrap {
  display: flex;
}

.collapse-btn {
  margin-right: 21px;
  cursor: pointer;
  line-height: 75px;
}

.header .logo {
  line-height: 70px;
}

.header-right {
  float: right;
  padding-right: 50px;
}

.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}

.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}

.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}

.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}

.btn-bell .el-icon-bell {
  color: #fff;
}

.user-name {
  margin-left: 10px;
}

.user-avator {
  margin-left: 20px;
}

.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}

.header-left .el-menu-wrap {
  flex: 1;
}

.el-menu-top.el-menu.el-menu--horizontal {
  height: 100%;
}

.el-menu-top.el-menu.el-menu--horizontal .el-menu-item {
  height: 100%;
  font-size: 18px;
}

.header-left .el-menu-wrap .el-menu.el-menu--horizontal {
  border-bottom: none;
  text-align: center;
  display: flex;
  justify-content: center;
  color: #fff;
}

.header-left .el-menu-wrap .el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: none;
  color: #fff;
}

.el-dropdown-menu__item {
  text-align: center;
}
</style>
