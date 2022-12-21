<template>
  <div class="my-poster-container">
    <el-container>
      <el-aside class="poster-tool-list" width="200px">
        <toolbar @destroyTransformer="destroyTransformerEvt" />
      </el-aside>
      <el-main class="poster-work-bench">
        <div v-loading="isShowLoading" class="outer-konva-stage">
          <k-stage ref="refMainStage" @dragend="dragendEvt" @wheel="handleStageMousewheel" @mousedown="handleStageClick"
            :config="configKonva">
            <k-layer v-if="layerList.length">
              <k-rect :config="backgroundConfig"></k-rect>
              <layerRenderComp v-for="item in layerList" :key="item.attrs.id" v-bind="item">
              </layerRenderComp>
              <k-transformer @transform="transitionendEvt" ref="refTransformer" :config="configTransformer">
              </k-transformer>
              <k-rect :config="selectionBoxConfig"></k-rect>
            </k-layer>
          </k-stage>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, provide, getCurrentInstance } from 'vue'
import Konva from 'konva'
import toolbar from './toolbar.vue'
import layerRenderComp from './layerRenderComp.vue'
import { getShageDataById } from './utils'
import { anchorsTrnasformer } from './config'
import useLayerList from './hooks/useLayerList'
import { useMyPosterStore } from '@/store/myPoster'
import { computedFitScale, changeScaleRate } from './hooks/useScaleStage'
import { Transformer } from 'konva/lib/shapes/Transformer'
import('./myPoster.scss')
const currentInstance = getCurrentInstance()
const refTransformer = ref(null)
// 主stage实例
const refMainStage = ref(null)

const configKonva = reactive({
  id: 'mainStageId',
  width: 1920,
  height: 1080
})

// 动态矩形选择框
const selectionBoxConfig = reactive({
  id: 'selectionBox',
  fill: 'rgba(0,0,255,0.5)',
  visible: false
})

// rect模拟背景层配置
const backgroundConfig = reactive({
  id: 'backgroundRect',
  width: configKonva.width,
  height: configKonva.height,
  x: 0,
  y: 0,
  strokeWidth: 1,
  stroke: '#fff',
  fill: 'rgb(50, 65, 87)',
  fillPatternImage: null
})
provide('backgroundConfig', backgroundConfig)

// 图层数据列表
const { isShowLoading, layerList } = useLayerList()
const currentShape = ref([])

// 可变形矩形选择
const configTransformer = reactive({
  listening: true,
  id: 'mainTransfer'
})
// 数据提供
provide('currentShape', currentShape)
provide('layerList', layerList)
provide('configKonva', configKonva)

function handleStageMousewheel (e) {
  e.evt.preventDefault()
  if (e.evt.ctrlKey === true) {
    console.log(e.evt.wheelDelta)
    // setStageScale(e.evt.wheelDelta / 100, currentInstance)
  }
}

// 鼠标指标的坐标位置
const selectionBoxOption = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0
}
// 鼠标在画布（即背景图）上移动时事件
function mousemoveOnstage (e) {
  if (!selectionBoxConfig.visible) {
    return
  }
  e.evt.preventDefault()
  selectionBoxOption.x2 = this.getPointerPosition().x
  selectionBoxOption.y2 = this.getPointerPosition().y
  const { x1, y1, x2, y2 } = selectionBoxOption
  Object.assign(selectionBoxConfig, {
    x: Math.min(x1, x2),
    y: Math.min(y1, y2),
    width: Math.abs(x2 - x1),
    height: Math.abs(y2 - y1)
  })
}

// Stage点击事件
function handleStageClick (e) {
  // 当点击模拟背景节点时
  if (e.target.attrs.id === 'backgroundRect') {
    currentShape.value = []
    updateTransformer()
    e.evt.preventDefault()
    selectionBoxOption.x1 = this.getPointerPosition().x
    selectionBoxOption.y1 = this.getPointerPosition().y
    selectionBoxOption.x2 = this.getPointerPosition().x
    selectionBoxOption.y2 = this.getPointerPosition().y
    selectionBoxConfig.visible = true
    selectionBoxConfig.width = 0
    selectionBoxConfig.height = 0
    this.on('mousemove touchmove', mousemoveOnstage)
    this.on('mouseup touchend', () => {
      this.off('mousemove touchmove')
      if (selectionBoxConfig.width && selectionBoxConfig.height) {
        const selectBoxNode = this.findOne('#selectionBox')
        const box = selectBoxNode.getClientRect()
        const selected = []
        layerList.forEach((el) => {
          const id = el.attrs.id
          const shape = this.findOne(`#${id}`)
          if (Konva.Util.haveIntersection(box, shape.getClientRect())) {
            selected.push(shape)
          }
        })
        if (selected.length) {
          currentShape.value = [...selected]
          updateTransformer()
        }
      }
      Object.assign(selectionBoxConfig, { visible: false })
    })
    return
  }
  // 当点击Transformer节点时
  if (e.target.getParent() === refTransformer.value.getNode()) {
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
function dragendEvt ({ target }) {
  if (target.attrs.id !== 'mainTransfer') {
    const { id } = target.attrs
    const shapeData = getShageDataById(id, layerList)
    shapeData &&
      Object.assign(shapeData.attrs, {
        x: target.getAbsolutePosition().x,
        y: target.getAbsolutePosition().y
      })
  }
}

// 矩形选择框变形完成事件
function transitionendEvt (e) {
  const shapesList = this.getNodes()
  const updateShapes = (shapes) => {
    shapes.forEach((shape) => {
      const { id } = shape.attrs
      const shapeData = getShageDataById(id, layerList)
      shapeData &&
        Object.assign(shapeData.attrs, {
          scaleX: shape.attrs.scaleX,
          scaleY: shape.attrs.scaleY
        })
      if (shape instanceof Konva.Group) {
        updateShapes(shape.children)
      }
    })
  }
  updateShapes(shapesList)
}

const fitScreen = () => {
  const scaleRate = computedFitScale(configKonva.width, configKonva.height)
  changeScaleRate(scaleRate, configKonva.width, configKonva.height)
}

// 生命钩子函数
onMounted(() => {
  const mPosterStore = useMyPosterStore()
  mPosterStore.setStageNode(refMainStage.value)
  fitScreen()
  window.addEventListener('resize', fitScreen)
})
</script>
<script>
export default {
  name: 'MyPosterPage'
}
</script>
