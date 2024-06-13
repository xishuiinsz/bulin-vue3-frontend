<template>
  <div class="content-editable-container">
    <div class="crumbs">
      <div class="el-breadcrumb" aria-label="Breadcrumb" role="navigation">
        <span class="el-breadcrumb__item" aria-current="page"></span>
        <span class="el-breadcrumb__inner" role="link">
          <i class="el-icon-lx-warn"></i>
          js调用tooltip
        </span>
        <span class="el-breadcrumb__separator" role="presentation">/</span>
      </div>
    </div>
    <div class="container">
      <h1>js如何调用ElTooltip组件</h1>
      <div @mouseenter="showTooltip($event.target)" style="max-width: 200px" class="text-nowrap overflow-hidden text-truncate">
        超长文本超长文本超长文本超长文本超长文本超长文本
      </div>
      <h1 class="mt-4">设置不同的zoom</h1>
      <div>
        <el-button @click="setZoom(0.75)" type="primary">0.75倍zoom</el-button>
        <el-button @click="setZoom(1)" type="primary">恢复zoom</el-button>
        <el-button @click="setZoom(1.25)" type="primary">1.25倍zoom</el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import showTooltip from '@/imperatives/showTooltip';
const setZoom = (value, element = document.body) => {
  Object.assign(element.style, { zoom: value });
};
</script>
<style lang="scss" scoped>
.content-editable-container {
  .multi-editable-form {
    width: 400px;
  }

  .div-content-editable {
    width: 100%;
    height: 32px;
    background-color: pink;
  }
}
</style>
