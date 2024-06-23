<template>
  <div class="scroll-drive-animation">
    <div class="crumbs">
      <div class="el-breadcrumb" aria-label="Breadcrumb" role="navigation">
        <span class="el-breadcrumb__item" aria-current="page"></span>
        <span class="el-breadcrumb__inner" role="link">
          <i class="el-icon-lx-warn"></i>
          滚动驱动动画
        </span>
      </div>
    </div>
    <div class="container">
      <div ref="root" class="w-100 h-100 position-relative">
        <ul class="my-list-group list-group w-25 my-0 mx-auto">
          <li :data-id="n" class="list-group-item" v-for="n in 80">item {{ n }}</li>
        </ul>
        <div data-id="81" class="card position-absolute my-card" style="width: 15rem; left: 1550px">
          <img src="@a/img/bg.png" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title text-danger">请注意</h5>
            <p class="card-text text-danger">我有顶部的最高红线，及底部的最低红线，我只能在它们之间移动。</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>
    <div
      style="width: 10px; height: 10px"
      class="position-fixed top-50 start-50 rounded bg-danger translate-middle-x translate-middle-y"
    ></div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useScrollEvtCallback } from '@h/useScrollEvt';
import { getElementById } from './utils';
const cache = {
  startEle: null,
  floatEle: null,
  endEle: null,
};
const root = ref(null);
const scrollHandler = () => {
  if (!cache.startEle) {
    Object.assign(cache, { startEle: getElementById('21', root.value) });
  }
  if (!cache.floatEle) {
    Object.assign(cache, { floatEle: getElementById('81', root.value) });
  }
  if (!cache.endEle) {
    Object.assign(cache, { endEle: getElementById('51', root.value) });
  }
  const centerViewport = window.innerHeight / 2;
  const { top: topOfStartEle } = cache.startEle.getBoundingClientRect();
  const { top: topOfEndEle } = cache.endEle.getBoundingClientRect();
  const { height: heightOfFloatEle } = cache.floatEle.getBoundingClientRect();
  if (centerViewport < topOfStartEle) {
    Object.assign(cache.floatEle.style, { top: cache.startEle.style.top });
  } else if (centerViewport > topOfEndEle) {
    const top = topOfEndEle - root.value.getBoundingClientRect().top - heightOfFloatEle;
    Object.assign(cache.floatEle.style, { top: `${top}px` });
  } else {
    const distOfStartEleToCenter = centerViewport - topOfStartEle;
    const distOfEndEleToCenter = topOfEndEle - centerViewport;
    if (distOfStartEleToCenter <= heightOfFloatEle / 2) {
      Object.assign(cache.floatEle.style, { top: cache.startEle.style.top });
    } else if (distOfEndEleToCenter <= heightOfFloatEle / 2) {
      const top = parseFloat(cache.endEle.top) - heightOfFloatEle;
      Object.assign(cache.floatEle.style, { top: `${top}px` });
    } else {
      const top = centerViewport - root.value.getBoundingClientRect().top - heightOfFloatEle / 2;
      Object.assign(cache.floatEle.style, { top: `${top}px` });
    }
  }
};
useScrollEvtCallback(scrollHandler);
</script>
<style lang="scss" scoped>
.scroll-drive-animation {
  .multi-editable-form {
    width: 400px;
  }

  .container {
  }
  .my-card {
    top: calc(41px * 20);
  }
  .my-list-group.list-group {
    .list-group-item {
      &:nth-child(21) {
        position: relative;
        background-color: green;
        &::after {
          content: '卡片移动的最高点';
          position: absolute;
          width: 100%;
          height: 2px;
          top: 0;
          right: 0;
          transform: translateX(100%);
          background-color: red;
        }
      }
      &:nth-child(51) {
        position: relative;
        background-color: green;
        &::after {
          content: '卡片移动的最低点';
          position: absolute;
          width: 100%;
          height: 2px;
          top: 0;
          right: 0;
          transform: translateX(100%);
          background-color: red;
        }
      }
    }
  }
}
</style>
