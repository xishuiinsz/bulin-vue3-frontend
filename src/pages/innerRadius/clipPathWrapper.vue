<template>
  <div :class="direction" class="clip-path-wrapper">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
type Props = {
  direction: 'horizontal' | 'vertical';
};
const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
});
</script>
<style lang="scss" scoped>
$distance: 16;

.card-wrap {
  .clip-path-wrapper {
    --bs-border-color: #dee2e6;
    position: relative;
  }
  &:last-child {
    .clip-path-wrapper {
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, $distance * 1px 50%);
      &.horizontal {
        &::before {
          content: '';
          position: absolute;
          height: 100%;
          width: 1px;
          bottom: 50%;
          left: calc($distance * 1px + 1px);
          transform: rotate(317deg);
          transform-origin: left bottom;
          background-color: #0d6efd;
        }
        &::after {
          content: '';
          position: absolute;
          height: 100%;
          width: 1px;
          top: 50%;
          left: calc($distance * 1px + 1px);
          transform: rotate(43deg);
          transform-origin: left top;
          background-color: #0d6efd;
        }
      }
    }
  }
  &:not(:last-child) {
    .clip-path-wrapper {
      clip-path: polygon(0% 0%, calc(100% - $distance * 1px) 0, 100% 50%, calc(100% - $distance * 1px) 100%, 0% 100%);
      &.horizontal {
        &::before {
          content: '';
          position: absolute;
          height: 100%;
          width: 1px;
          top: 0;
          left: calc(100% - $distance * 1px - 1px);
          transform: rotate(-43deg);
          transform-origin: left top;
          background-color: #0d6efd;
        }
        &::after {
          content: '';
          position: absolute;
          height: 100%;
          width: 1px;
          bottom: 0;
          left: calc(100% - $distance * 1px - 1px);
          transform: rotate(43deg);
          transform-origin: center bottom;
          background-color: #0d6efd;
        }
      }
    }
  }
}
</style>
