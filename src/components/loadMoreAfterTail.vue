<template>
  <div class="load-more-after-tail text-wrap w-100 h-100" @mouseenter="showToottip($event.target, { placement: 'top' })">
    <span class="placeholder-wrap d-flex">
      <slot name="placeholder"></slot>
    </span>
    <slot></slot>
  </div>
</template>
<script setup>
import showToottip from '@/imperatives/showTooltip';
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
.text-wrap {
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  display: -webkit-box;
  line-clamp: v-bind(lineClamp);
  -webkit-line-clamp: v-bind(lineClamp);
  -webkit-box-orient: vertical;
  position: relative;
}
.text-wrap::before {
  content: '';
  height: calc(100% - v-bind(height));
  float: right;
}
.placeholder-wrap {
  float: right;
  clear: both;
}
</style>
