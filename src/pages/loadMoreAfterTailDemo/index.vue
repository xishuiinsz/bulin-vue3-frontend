<template>
  <div class="load-more-after-tail-demo w-100 h-100 d-flex flex-column">
    <div class="crumbs">
      <div class="el-breadcrumb" aria-label="Breadcrumb" role="navigation">
        <span class="el-breadcrumb__item" aria-current="page"></span>
        <span class="el-breadcrumb__inner" role="link">
          <i class="el-icon-lx-warn"></i>
          多行文本尾部的加载更多
        </span>
      </div>
    </div>
    <div class="container w-100 h-100 flex-fill">
      <div class="" style="width: 500px">
        <loadMoreAfterTail>
          <template #placeholder>
            <button class="btn">这是一个占位</button>
          </template>
          浮动元素是如何定位的
          正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容sfsdffasdfasdfadsfasdfas然后向左或者向右平移，一直平移直到碰到了所处的容sfsdffa
        </loadMoreAfterTail>
      </div>
    </div>
  </div>
</template>
<script setup>
import loadMoreAfterTail from '@c/loadMoreAfterTail.vue';
</script>
<style lang="scss" scoped>
.load-more-after-tail-demo {
}
</style>
