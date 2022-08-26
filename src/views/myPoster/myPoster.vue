<template>
  <div class="my-poster-container">
    <el-container>
      <el-aside class="poster-tool-list" width="200px">
        <toolbar :nodeType="currentNodeType" />
      </el-aside>
      <el-main ref="refWorkbenchContainer" class="poster-work-behch">
        <k-stage @click="handleClick" :config="configKonva">
          <k-layer>
            <layerList v-for="item in list" :key="item.attrs.id" v-bind="{ type: item.type, attrs: item.attrs }">
            </layerList>
            <k-transformer ref="refTransformer"></k-transformer>
          </k-layer>
        </k-stage>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { onMounted, reactive, ref, shallowRef } from 'vue'
import toolbar from './toolbar.vue'
import layerList from './layerList.vue'
import layerData from './layerData'
import img from '@/assets/img/img.jpg'
import { computed } from '@vue/reactivity'
import('./myPoster.scss')
export default {
  name: 'MyPosterPage'
}
</script>
<script setup>
const currentId = ref(0)
const refTransformer = ref(null)
const refWorkbenchContainer = ref(null)
const configKonva = reactive({
  width: 200,
  height: 200
})
const list = reactive(layerData)
const currentShape = shallowRef(null)
// Stage点击事件
function handleClick (e) {
  if (this === e.target) {
    updateTransformer()
  } else {
    updateTransformer(e.target)
  }
  console.log(e.target);
  currentShape.value = e.target
}

const currentNodeType = computed(() => {
  let type = 'Stage'
  if (currentShape.value) {
    type = currentShape.value.nodeType
  }
  return type
})

// 绘制变形选择框
function updateTransformer (selectedNode) {
  const transformerNode = refTransformer.value.getNode();
  if (selectedNode) {
    transformerNode.nodes([selectedNode]);
  } else {
    transformerNode.nodes([]);
  }
}

// 生命钩子函数
onMounted(() => {
  setTimeout(() => {
    const container = document.querySelector('.poster-work-behch')
    if (container) {
      configKonva.width = container.offsetWidth
      configKonva.height = container.offsetHeight
    }
    var imageObj = new Image();
    imageObj.onload = function () {
      const [findedRow] = list.filter(item => item.attrs.id === '3')
      if (findedRow) {
        findedRow.attrs.image = this
      }
    }
    imageObj.src = img
  }, 200)
})
</script>
