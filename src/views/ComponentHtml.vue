<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-redpacket_fill"></i>
          获取组件[src\views\404.vue]的html文本
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div>{{ html }}</div>
      <div style="margin-top: 16px" v-html="html"></div>
    </div>
  </div>
</template>

<script>
import { createApp, onMounted, ref } from 'vue'
import { renderToString } from 'vue/server-renderer'
import page404 from './404.vue'
export default {
  name: 'Donate',
  setup() {
    const html = ref('')
    onMounted(() => {
      renderToString(createApp(page404, { name: '张小刚' })).then((result) => {
        html.value = result
      })
    })
    return {
      html
    }
  }
}
</script>

<style></style>
