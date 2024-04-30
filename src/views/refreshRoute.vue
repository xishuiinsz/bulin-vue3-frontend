<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-warn">刷新当前路由</i>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <h1>在某些场景下，需要使用js代码来刷新当前路由对应的组件</h1>
      <p></p>
      <h3>当前页面加载{{ getLoadCount() }}次</h3>
      <el-button @click="refreshRouteClick" type="primary">刷新路由</el-button>
    </div>
  </div>
</template>

<script setup>
import refreshRoute from '@u/refreshRoute';

const myKey = 'loadCount';

const refreshRouteClick = () => {
  const count = getLoadCount();
  const newCount = Number(count) + 1;
  sessionStorage.setItem(myKey, newCount);
  refreshRoute();
};

const getLoadCount = () => {
  const count = sessionStorage.getItem(myKey);
  if (!count) {
    sessionStorage.setItem(myKey, 1);
  }
  return sessionStorage.getItem(myKey);
};
</script>
<script>
export default {
  name: 'permission',
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin: 30px 0;
}
p {
  line-height: 30px;
  margin-bottom: 10px;
  text-indent: 2em;
}
.logout {
  color: #409eff;
}
</style>
