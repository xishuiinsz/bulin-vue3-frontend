<template>
  <div class="load-more-after-tail w-100 h-100">
    <span class="placeholder-wrap d-flex">
      <slot name="placeholder"></slot>
    </span>
    <div @mouseenter="showTooltip($event.target, { placement: 'top' })" class="text-wrap">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
import showTooltip from '@/imperatives/showTooltip';
defineOptions({
  name: 'LoadMoreAfterTail',
});
const props = defineProps({
  floatHeight: {
    type: [String, Number],
    default: 24,
  },
  lineClamp: {
    type: [String, Number],
    default: 2,
  },
});
const height = isNaN(props.floatHeight) ? props.floatHeight : `${props.floatHeight}px`;
</script>
<style lang="scss">
.load-more-after-tail {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: v-bind(lineClamp);
  -webkit-line-clamp: v-bind(lineClamp);
  -webkit-box-orient: vertical;
}
.load-more-after-tail::before {
  content: '';
  height: calc(100% - v-bind(height));
  float: right;
}
.placeholder-wrap {
  float: right;
  clear: both;
}
</style>
