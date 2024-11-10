<template>
  <div class="card" style="width: 220px">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">{{ desc }}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</template>
<script setup>
import { getRangeInteger } from '@u';
const props = defineProps({
  title: {
    type: String,
    default: '标题' + Date.now(),
  },
});
const desc = `Some quick example text to.`.repeat(getRangeInteger(2, 6));
</script>
