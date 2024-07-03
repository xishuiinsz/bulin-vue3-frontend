<template>
  <div ref="root" class="multi-items-carouse invisible width-fit-conten position-relative">
    <div class="carouse-wrap overflow-hidden">
      <div :style="getStyle">
        <slot></slot>
      </div>
    </div>
    <el-button
      :disabled="index === 0"
      @click="preBtnClick"
      :icon="ArrowLeft"
      class="position-absolute start-0 top-50 translate-middle-y"
      circle
    />
    <el-button
      :disabled="disableNextBtn"
      @click="nextBtnClick"
      :icon="ArrowRight"
      class="position-absolute end-0 top-50 translate-middle-y"
      circle
    />
  </div>
</template>
<script setup>
import { ref, onMounted, nextTick, computed } from 'vue';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
defineOptions({
  name: 'MultiItemsCarouse',
});
const props = defineProps({
  rows: {
    type: Number,
    default: 3,
  },
  selector: {
    type: String,
    default: '',
  },
  animation: {
    type: Object,
    default: () => {
      return { transition: 'transform 0.8s ease' };
    },
  },
});

const root = ref(null);

/**
 * 基于选择器，返回元素集合
 *
 * @param { String } selector 元素选择器
 * @returns { HTMLCollection } 元素集合
 */
const getElementsBySelector = (selector) => {
  const className = selector.startsWith('.') ? selector : `.${selector}`;
  const elements = root.value.querySelectorAll(className);
  return elements;
};

// 偏移元素个数的
const index = ref(0);

/**
 * 基于最左边元素的索引值，计算偏移的距离
 *
 * @param { Number } order 最左边元素的索引值
 * @returns { Numnber } 偏移的距离
 */
const getDistanceByIndex = (order) => {
  const elements = getElementsBySelector(props.selector);
  const firstElement = elements[0];
  const lastElement = elements[order];
  const { left: firstElementX } = firstElement.getBoundingClientRect();
  const { left: lastElementX } = lastElement.getBoundingClientRect();
  const distance = lastElementX - firstElementX;
  return distance;
};

// 禁用向右按钮
const disableNextBtn = computed(() => {
  if (index.value === 0) {
    return false;
  }
  const elements = getElementsBySelector(props.selector);
  return elements.length - props.rows <= index.value;
});

// 向前按钮点击
const preBtnClick = () => {
  index.value -= 1;
};

// 向后按钮点击
const nextBtnClick = () => {
  index.value += 1;
};

// 移动样式
const getStyle = computed(() => {
  let offset = 0;
  if (index.value !== 0) {
    offset = -getDistanceByIndex(index.value);
  }
  return {
    ...props.animation,
    transform: `translateX(${offset}px)`,
  };
});

// 初始化
const init = () => {
  const elements = getElementsBySelector(props.selector);
  const firstElement = elements[0];
  const lastElement = elements[props.rows - 1];
  const { left } = firstElement.getBoundingClientRect();
  const { right } = lastElement.getBoundingClientRect();
  const width = right - left;
  root.value.classList?.remove('invisible');
  Object.assign(root.value.style, { width: `${width}px` });
};

onMounted(() => nextTick(init));
</script>
<style lang="scss" scoped>
.multi-items-carouse {
}
</style>
