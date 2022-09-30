<template>
  <div class="my-poster-container">
    <el-container>
      <el-aside class="poster-tool-list" width="200px">
        <toolbar @destroyTransformer="destroyTransformerEvt" />
      </el-aside>
      <el-main ref="refWorkbenchContainer" class="poster-work-behch">
        <k-stage @mousedown="handleStageClick" :config="configKonva">
          <k-layer>
            <layerList v-for="item in list" :key="item.attrs.id" v-bind="item">
            </layerList>
            <k-transformer
              @dragend="dragendEvt"
              @transform="transitionendEvt"
              ref="refTransformer"
              :config="configTransformer"
            >
            </k-transformer>
          </k-layer>
        </k-stage>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { onMounted, reactive, ref, provide } from 'vue'
import Konva from 'konva'
import toolbar from './toolbar.vue'
import layerList from './layerList.vue'
import layerRawData from './layerData'
import img from '@/assets/img/img.jpg'
import { getShageOptionById } from './utils'
import('./myPoster.scss')
export default {
  name: 'MyPosterPage'
}
</script>
<script setup>
const refTransformer = ref(null)
const refWorkbenchContainer = ref(null)
const configKonva = reactive({
  width: 1000,
  height: 800
})
const list = reactive(layerRawData)
const currentShape = ref([])
const configTransformer = reactive({
  listening: true
})
provide('currentShape', currentShape)
provide('layerList', list)
provide('configKonva', configKonva)
// Stage点击事件
function handleStageClick(e) {
  // 点击对象为选择框的小矩形
  if (e.target.getParent() === refTransformer.value.getNode()) return
  if (this === e.target) {
    currentShape.value = []
    updateTransformer()
    return
  }
  let nodeEle
  if (e.target.getParent() instanceof Konva.Group) {
    nodeEle = e.target.getParent()
  } else {
    nodeEle = e.target
  }
  if (e.evt.ctrlKey) {
    currentShape.value.push(nodeEle)
  } else {
    currentShape.value = [nodeEle]
  }

  updateTransformer()
}

// 绘制变形选择框
function updateTransformer() {
  const transformerNode = refTransformer.value.getNode()
  transformerNode.nodes(currentShape.value)
  return transformerNode
}

// 销毁矩形选择框
const destroyTransformerEvt = () => {
  const transformerNode = refTransformer.value.getNode()
  transformerNode.nodes([])
}

// transformer 拖拽完成事件
function dragendEvt({ target }) {
  const [shape] = target.getNodes()
  let shapes = [shape]
  if (shape instanceof Konva.Group) {
    shapes = shape.children
  }
  shapes.length &&
    shapes.forEach((shape) => {
      const { id } = shape.attrs
      const shapeData = getShageOptionById(id, layerRawData)
      shapeData &&
        Object.assign(shapeData.attrs, {
          x: shape.getAbsolutePosition().x,
          y: shape.getAbsolutePosition().y
        })
    })
}

// 矩形选择框变形完成事件
function transitionendEvt(e) {
  const transformerNode = refTransformer.value.getNode()
  const shapes = transformerNode.getNodes()
  shapes.forEach((shape) => {
    const { id } = shape.attrs
    const [shapeData] = layerRawData.filter((item) => item.attrs.id === id)
    if (shapeData) {
      Object.assign(shapeData.attrs, {
        scaleX: shape.attrs.scaleX,
        scaleY: shape.attrs.scaleY
      })
    }
  })
}

// 生命钩子函数
onMounted(() => {
  setTimeout(() => {
    const imageObj = new window.Image()
    imageObj.onload = function () {
      const [findedRow] = list.filter((item) => item.type === 'Image')
      if (findedRow) {
        findedRow.attrs.image = this
      }
    }
    imageObj.src = img
  }, 200)
})
</script>
