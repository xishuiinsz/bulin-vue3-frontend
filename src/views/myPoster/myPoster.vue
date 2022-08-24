<template>
  <div class="my-poster">
    测试
    <k-stage :config="configKonva">
      <k-layer>
        <k-circle
          ref="refCircle"
          :config="configCircle"
          __useStrictMode
        ></k-circle>
      </k-layer>
    </k-stage>
  </div>
</template>
<script>
import { onMounted, reactive, ref } from 'vue'
export default {
  name: 'MyPosterPage'
}
</script>
<script setup>
const configKonva = reactive({
  width: 200,
  height: 200
})
const configCircle = reactive({
  x: 100,
  y: 100,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4,
  draggable: true
})
const refCircle = ref(null)
onMounted(() => {
  console.log(refCircle.value)
})
</script>
