<template>
  <konva-comp />
</template>
<script setup>
import { h, resolveComponent } from 'vue'
import layerRenderComp from './layerRenderComp.vue'
const props = defineProps({
  type: String,
  attrs: Object,
  children: Array
})
const option = {
  config: props.attrs
}
const KonvaComp = h(
  resolveComponent(`k-${props.type}`),
  option,
  props.children
    ? () => [props.children.map((child) => h(layerRenderComp, { ...child }))]
    : null
)
</script>
