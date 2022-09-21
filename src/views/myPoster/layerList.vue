<template><konva-comp /></template>
<script setup>
import { h, resolveComponent } from 'vue'
const props = defineProps({
  type: String,
  attrs: Object
})
const KonvaComp = h(resolveComponent(`k-${props.type}`), {
  config: props.attrs
})
</script>
