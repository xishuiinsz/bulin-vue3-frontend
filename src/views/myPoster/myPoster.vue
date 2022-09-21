<template>
  <div class="my-poster-container">
    <el-container>
      <el-aside class="poster-tool-list" width="200px">
        <toolbar
          @destroyTransformer="destroyTransformerEvt"
          @layerCanvasUpdate="layerCanvasUpdateEvt"
          :id="currentId"
        />
      </el-aside>
      <el-main ref="refWorkbenchContainer" class="poster-work-behch">
        <k-stage
          @dragend="dragendEvt"
          @mousedown="handleStageClick"
          :config="configKonva"
        >
          <k-layer :key="keyMainCanvas">
            <layerList
              v-for="item in list"
              :key="item.attrs.id"
              v-bind="{ type: item.type, attrs: item.attrs }"
            >
            </layerList>
            <k-transformer @transform="transitionendEvt" ref="refTransformer">
            </k-transformer>
          </k-layer>
        </k-stage>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { onMounted, reactive, ref, shallowRef, provide, nextTick } from 'vue'
import toolbar from './toolbar.vue'
import layerList from './layerList.vue'
import layerRawData from './layerData'
import img from '@/assets/img/img.jpg'
import get from 'lodash/get'
import('./myPoster.scss')
export default {
  name: 'MyPosterPage'
}
</script>
<script setup>
const currentId = ref('0')
const keyMainCanvas = ref(0)
const refTransformer = ref(null)
const refWorkbenchContainer = ref(null)
const configKonva = reactive({
  width: 800,
  height: 600
})
const list = reactive(layerRawData)
const currentShape = shallowRef(null)
provide('currentShape', currentShape)
provide('layerList', list)
provide('configKonva', configKonva)
// Stage点击事件
function handleStageClick(e) {
  // 点击对象为选择框的小矩形
  if (e.target.getParent() === refTransformer.value.getNode()) return
  if (this === e.target) {
    updateTransformer()
    currentId.value = '0'
  } else {
    updateTransformer(e.target)
    const id = get(e, 'target.attrs.id')
    if (id) {
      currentId.value = id
    }
  }
  currentShape.value = e.target
}

// 绘制变形选择框
function updateTransformer(selectedNode) {
  const transformerNode = refTransformer.value.getNode()
  if (selectedNode) {
    transformerNode.nodes([selectedNode])
    transformerNode.moveToTop()
  } else {
    transformerNode.nodes([])
  }
  return transformerNode
}

// 销毁矩形选择框
const destroyTransformerEvt = () => {
  const transformerNode = refTransformer.value.getNode()
  transformerNode.nodes([])
}

// canvas强制更新
const layerCanvasUpdateEvt = () => {
  keyMainCanvas.value++
  nextTick(() => {
    updateTransformer(currentShape.value)
  })
}

function dragendEvt({ target }) {
  const { id } = target.attrs
  const [shapeData] = layerRawData.filter((item) => item.attrs.id === id)
  if (shapeData) {
    Object.assign(shapeData.attrs, {
      x: target.attrs.x,
      y: target.attrs.y
    })
  }
}

// 矩形选择框变形完成事件
function transitionendEvt() {
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
    // const container = document.querySelector('.poster-work-behch')
    // if (container) {
    //   configKonva.width = container.offsetWidth
    //   configKonva.height = container.offsetHeight
    // }
    const imageObj = new Image()
    imageObj.onload = function () {
      const [findedRow] = list.filter((item) => item.attrs.id === '3')
      if (findedRow) {
        findedRow.attrs.image = this
      }
    }
    imageObj.src = img
  }, 200)
})
</script>
