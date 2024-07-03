<template>
  <div class="multi-items-carousel w-100 h-100 d-flex flex-column">
    <div class="crumbs">
      <div class="el-breadcrumb" aria-label="Breadcrumb" role="navigation">
        <span class="el-breadcrumb__item" aria-current="page"></span>
        <span class="el-breadcrumb__inner" role="link">
          <i class="el-icon-lx-warn"></i>
          多项目走马灯
        </span>
      </div>
    </div>
    <div class="container w-100 h-100 flex-fill">
      <div class="text-center d-flex gap-4 justify-content-center">
        <multiItemsCarouse :items="3" selector="img-item">
          <albums />
        </multiItemsCarouse>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import albums from './components/albums';
import multiItemsCarouse from './components/multiItemsCarouse';
</script>
<style lang="scss" scoped>
.multi-items-carousel {
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>
