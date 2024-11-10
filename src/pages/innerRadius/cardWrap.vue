<template>
  <div class="card-wrap">
    <clip-path-wrapper>
      <div class="card-head img-thumbnail text-center">{{ data.title }}</div>
    </clip-path-wrapper>
    <div class="card-list d-flex mt-3 gap-2">
      <card :title="`Card title${n}`" v-for="n in data.num" />
    </div>
  </div>
</template>
<script setup>
import card from './card.vue';
import { getRangeInteger } from '@u';
import clipPathWrapper from './clipPathWrapper.vue';
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
</script>
<style lang="scss" scoped>
.card-wrap {
  .card-head {
    border-color: #0d6efd;
  }
}
</style>
