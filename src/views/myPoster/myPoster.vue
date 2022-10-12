<template>
  <div class="my-poster-container">
    <el-container>
      <el-aside class="poster-tool-list" width="200px">
        <toolbar @destroyTransformer="destroyTransformerEvt" />
      </el-aside>
      <el-main class="poster-work-behch">
        <k-stage ref="refMainStage" @mousedown="handleStageClick" :config="configKonva">
          <k-layer>
            <k-rect :config="backgroundConfig"></k-rect>
            <layerList v-for="item in list" :key="item.attrs.id" v-bind="item">
            </layerList>
            <k-transformer @dragend="dragendEvt" @transform="transitionendEvt" ref="refTransformer"
              :config="configTransformer">
            </k-transformer>
          </k-layer>
        </k-stage>
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, provide, getCurrentInstance } from 'vue'
import Konva from 'konva'
import toolbar from './toolbar.vue'
import layerList from './layerList.vue'
import layerRawData from './layerData'
import img from '@/assets/img/img.jpg'
import { getShageOptionById, setStageScale } from './utils'
import { anchorsTrnasformer } from './config'

import('./myPoster.scss')
const currentInstance = getCurrentInstance()
const refTransformer = ref(null)
// 主stage实例
const refMainStage = ref(null)

const configKonva = reactive({
  id: 'mainStageId',
  width: 1000,
  height: 800
})

// rect模拟背景层配置
const backgroundConfig = reactive({
  id: 'backgroundRect',
  width: configKonva.width,
  height: configKonva.height,
  x: 0,
  y: 0,
  fill: 'rgb(50, 65, 87)',
  fillPatternImage: null
})
provide('backgroundConfig', backgroundConfig)

const list = reactive(layerRawData)
const currentShape = ref([])

// 可变形矩形选择
const configTransformer = reactive({
  listening: true,
  id: 'mainTransfer'
})
// 数据提供
provide('currentShape', currentShape)
provide('layerList', list)
provide('configKonva', configKonva)
// Stage点击事件
function handleStageClick (e) {
  // 点击对象为用来模拟【背景】的矩形
  if (e.target.getParent() === refTransformer.value.getNode()) return
  if (e.target.attrs.id === 'backgroundRect') {
    currentShape.value = []
    updateTransformer()
    return
  }
  // 当点击对象为stage时
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
  if (currentShape.value.some((s) => s.attrs.draggable === false)) {
    configTransformer.rotateEnabled = false
    configTransformer.borderStroke = '#c0c4cc'
    configTransformer.enabledAnchors = []
  } else {
    configTransformer.borderStroke = '#337ecc'
    configTransformer.rotateEnabled = true
    configTransformer.enabledAnchors = anchorsTrnasformer
  }

  updateTransformer()
}

// 绘制变形选择框
function updateTransformer () {
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
function dragendEvt () {
  const shapesList = this.getNodes()
  const updateShapes = (shapes) => {
    shapes.forEach((shape) => {
      const { id } = shape.attrs
      const shapeData = getShageOptionById(id, layerRawData)
      shapeData &&
        Object.assign(shapeData.attrs, {
          x: shape.getAbsolutePosition().x,
          y: shape.getAbsolutePosition().y
        })
      if (shape instanceof Konva.Group) {
        updateShapes(shape.children)
      }
    })
  }
  updateShapes(shapesList)
}

// 矩形选择框变形完成事件
function transitionendEvt (e) {
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
  const { globalProperties } = currentInstance.appContext.config
  Object.assign(globalProperties, { mainKonvaStage: refMainStage.value })
  setStageScale(1, currentInstance)
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
<script>
export default {
  name: 'MyPosterPage'
}
</script>
