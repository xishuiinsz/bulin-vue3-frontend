<template>
  <div class="w-100 load-more-after-tail">
    <div class="w-100 wrapper">
      <div class="text">
        <span class="btn">
          <slot name="placeholder"></slot>
        </span>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'LoadMoreAfterTail',
});
const props = defineProps({
  lineClamp: {
    type: [String, Number],
    default: 2,
  },
});
</script>
<style lang="scss">
.wrapper {
  display: flex;
  overflow: hidden;
  border-radius: 8px;
//   padding: 15px;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
}
.text {
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  display: -webkit-box;
  -webkit-line-clamp: v-bind(lineClamp);
  -webkit-box-orient: vertical;
  position: relative;
}
.text::before {
  content: '';
  height: calc(100% - 24px);
  float: right;
}
.btn {
  float: right;
  clear: both;
  margin-left: 10px;
  font-size: 16px;
  padding: 0 8px;
  background: #3f51b5;
  line-height: 24px;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  border: 0;
}
button {
  float: right;
  clear: both;
  margin-left: 10px;
}
</style>
