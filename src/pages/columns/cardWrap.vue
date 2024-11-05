<template>
  <div>
    <div class="card-head img-thumbnail text-center">{{ data.title }}</div>
    <div class="card-list d-flex mt-3">
      <card :title="`Card title${n}`" v-for="n in data.num" />
    </div>
  </div>
</template>
<script setup>
import card from './card.vue';
import { getRangeInteger } from '@u';
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
</script>
