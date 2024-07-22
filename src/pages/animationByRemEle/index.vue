<template>
  <div class="animation-by-rem-ele w-100 h-100 d-flex flex-column">
    <div class="crumbs">
      <div class="el-breadcrumb" aria-label="Breadcrumb" role="navigation">
        <span class="el-breadcrumb__item" aria-current="page"></span>
        <span class="el-breadcrumb__inner" role="link">
          <i class="el-icon-lx-warn"></i>
          删除行动画
        </span>
      </div>
    </div>
    <div class="container w-100 h-100 flex-fill">
      <div class="card w-25">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde ipsum error sint! Illum pariatur reiciendis possimus
          aspernatur eius dolore optio saepe sapiente quaerat alias, iste autem facilis nisi beatae quod?
          <div class="text-end">
            <el-button type="primary">删除</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const deleteRow = (num) => {
  console.log(num);
};
</script>
<style lang="scss" scoped>
.animation-by-rem-ele {
}
</style>
