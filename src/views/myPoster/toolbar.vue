<template>
  <div class="toolbar-generic-container">
    <el-button-group class="common-btn-actions" v-show="isShowCommonTool">
      <el-button v-if="textLock" @click="lockModify(textLock)" type="primary">{{
          textLock
      }}</el-button>
      <el-button :disabled="availableDeleteLayer" @click="deleteLayerHandler" type="primary">删除</el-button>
      <el-button :disabled="availableMoveup" @click="moveToUpEvt" type="primary">上移一层</el-button>
      <el-button :disabled="availableMovedown" @click="moveTodownEvt" type="primary">下移一层</el-button>
      <el-button :disabled="availableMoveToTop" @click="moveToTopEvt" type="primary">置顶</el-button>
      <el-button :disabled="availableMoveToBottom" @click="moveToBottomEvt" type="primary">置底</el-button>
      <el-button :disabled="textLock === '解锁'" v-if="textGroup" @click="groupModify(textGroup)" type="primary">{{
          textGroup
      }}</el-button>
    </el-button-group>
    <component :is="currentComp" />
  </div>
</template>
<script setup>
import { computed, inject } from 'vue'
import stageTool from './StageToolBar.vue'
import circleTool from './circleTool.vue'
import imageTool from './imageTool.vue'
import textTool from './textTool.vue'
import groupTool from './GroupTool.vue'
import rectTool from './rectTool.vue'
import Konva from 'konva'
import {
  useLayerDelete,
  useMoveupLayer,
  useMovedownLayer,
  useLockModify,
  useGroupModify,
  useMoveToTop,
  useMoveToBottom
} from './hooks/hooks'
const emit = defineEmits(['destroyTransformer'])
const layerList = inject('layerList')
const shape = inject('currentShape')

// 根据shape来渲染相应的shape
const currentComp = computed(() => {
  if (shape.value.length === 1) {
    const [instanceShape] = shape.value
    if (instanceShape instanceof Konva.Text) return textTool
    if (instanceShape instanceof Konva.Image) return imageTool
    if (instanceShape instanceof Konva.Circle) return circleTool
    if (instanceShape instanceof Konva.Group) return groupTool
    if (instanceShape instanceof Konva.Rect) return rectTool
  }
  return stageTool
})

// 计算是否显示公共工具条
const isShowCommonTool = computed(() => {
  if (shape.value.length > 1) {
    return true
  }
  let flag = false
  if (shape.value.length === 1) {
    const [instanceShape] = shape.value
    if (instanceShape.nodeType !== 'Stage') {
      flag = true
    }
  }
  return flag
})

// 删除图层hook
const { availableDeleteLayer, deleteLayerHandler } = useLayerDelete(
  shape,
  layerList,
  () => {
    emit('destroyTransformer')
  }
)
// 锁定图层hook
const { textLock, lockModify } = useLockModify(shape, layerList)

// 上移一层hook
const { availableMoveup, moveToUpEvt } = useMoveupLayer(shape, layerList)

// 下移一层hook
const { availableMovedown, moveTodownEvt } = useMovedownLayer(shape, layerList)

// 组合hook
const { textGroup, groupModify } = useGroupModify(shape, layerList)

// 置顶hook
const { availableMoveToTop, moveToTopEvt } = useMoveToTop(shape, layerList)
// 置顶hook
const { availableMoveToBottom, moveToBottomEvt } = useMoveToBottom(
  shape,
  layerList
)
</script>
<script>
export default {
  name: 'DesignToolbar'
}
</script>
<style lang="scss" scoped>
.toolbar-generic-container {
  :deep(.common-btn-actions) {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
  }
}
</style>
