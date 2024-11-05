<template>
  <div class="card" style="width: 220px">
    <svg
      class="bd-placeholder-img card-img-top"
      width="100%"
      height="180"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Placeholder: Image cap"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
    >
      <title>Placeholder</title>
      <rect width="100%" height="100%" fill="#868e96"></rect>
      <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
    </svg>
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
