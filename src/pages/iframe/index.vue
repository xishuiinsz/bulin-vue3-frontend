<template>
  <div class="iframe-nest-window w-100 h-100 d-flex flex-column">
    <div class="crumbs">
      <div class="el-breadcrumb" aria-label="Breadcrumb" role="navigation">
        <span class="el-breadcrumb__item" aria-current="page"></span>
        <span class="el-breadcrumb__inner" role="link">
          <i class="el-icon-lx-warn"></i>
          iframe嵌套窗口
        </span>
      </div>
    </div>
    <div v-if="url" class="container w-100 h-100 flex-fill">
      <iframe class="w-100 h-100" :src="url" frameborder="0"></iframe>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const url = decodeURIComponent(route.query.url);
const hashSymbol = '#';
const registerMessage = () => {
  const messageEvtHandler = (e) => {
    if (e.data?.type === 'hashchange') {
      const { fullPath } = e.data;
      // 移除url中的query部分
      const pathStr = url.includes(hashSymbol) ? url.slice(0, url.indexOf(hashSymbol)) : url;
      // 更新url中的query部分
      const newURL = pathStr + encodeURIComponent(`${hashSymbol}${fullPath}`);
      router.push({
        path: route.path,
        query: {
          url: newURL,
        },
      });
    }
  };
  window.addEventListener('message', messageEvtHandler);
};
onMounted(registerMessage);
</script>
<style lang="scss" scoped>
.iframe-nest-window {
}
</style>
