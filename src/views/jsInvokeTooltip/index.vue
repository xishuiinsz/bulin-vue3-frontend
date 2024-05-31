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
    </div>
  </div>
</template>
<script setup>
import showTooltip from '@/imperatives/showTooltip';
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
