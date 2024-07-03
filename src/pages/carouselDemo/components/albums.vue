<template>
  <div class="d-flex gap-4">
    <span class="img-item" v-for="n in 6" :key="n">
      <svg
        class="bd-placeholder-img rounded"
        width="200"
        height="200"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Placeholder: 200x200"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#868e96"></rect>
        <text x="50%" y="50%" fill="#dee2e6" dy=".3em">{{ n }}</text>
      </svg>
    </span>
  </div>
</template>
