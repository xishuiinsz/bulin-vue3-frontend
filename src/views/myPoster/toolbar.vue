<template>
  <div class="toolbar-generic-container">
    <el-button-group class="common-btn-actions" v-show="isShowCommonTool">
      <el-button v-if="textLock" @click="lockModify(textLock)" type="primary">{{
        textLock
      }}</el-button>
      <el-button
        :disabled="textLock === '解锁'"
        @click="deleteShapeHandler"
        type="primary"
        >删除</el-button
      >
      <el-button :disabled="availableMoveup" @click="moveToUpEvt" type="primary"
        >上移一层</el-button
      >
      <el-button
        :disabled="availableMovedown"
        @click="moveTodownEvt"
        type="primary"
        >下移一层</el-button
      >
      <el-button
        :disabled="textLock === '解锁'"
        @click="moveToTopEvt"
        type="primary"
        >置顶</el-button
      >
      <el-button
        :disabled="textLock === '解锁'"
        @click="moveToBottomEvt"
        type="primary"
        >置底</el-button
      >
      <el-button
        :disabled="textLock === '解锁'"
        v-if="textGroup"
        @click="groupModify(textGroup)"
        type="primary"
        >{{ textGroup }}</el-button
      >
    </el-button-group>
    <component :is="currentComp" />
  </div>
</template>
<script setup>
import { computed, inject } from 'vue'
import stageTool from './stageTool.vue'
import circleTool from './circleTool.vue'
import imageTool from './imageTool.vue'
import textTool from './textTool.vue'
import groupTool from './GroupTool.vue'
import Konva from 'konva'
import {
  useMoveupLayer,
  useMovedownLayer,
  useLockModify,
  useGroupModify
} from './hooks'
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
    // if (instanceShape instanceof Konva.Rect) return rectTool
  }
  return stageTool
})

// 锁定hook
const { textLock, lockModify } = useLockModify(shape, layerList)

// 上移一层hook
const { availableMoveup, moveToUpEvt } = useMoveupLayer(shape, layerList)

// 下移一层hook
const { availableMovedown, moveTodownEvt } = useMovedownLayer(shape, layerList)

// 组合hook
const { textGroup, groupModify } = useGroupModify(shape, layerList)

// 判断是否显示公共工具条
const isShowCommonTool = computed(() => {
  let flag = false
  if (shape.value && shape.value.nodeType !== 'Stage') {
    flag = true
  }
  return flag
})
// 删除shape事件
const deleteShapeHandler = () => {
  shape.value
    .map((item) => item.attrs.id)
    .sort((a, b) => b - a)
    .forEach((id) => {
      const index = layerList.findIndex((item) => item.attrs.id === id)
      if (index > -1) {
        layerList.splice(index, 1)
        emit('destroyTransformer')
      }
    })
}

// 置顶
const moveToTopEvt = () => {
  const index = layerList.findIndex((item) => item.attrs.id === shape.attrs.id)
  if (index !== layerList.length - 1) {
    const [el] = layerList.splice(index, 1)
    layerList.push(el)
  }
}

// 置底
const moveToBottomEvt = () => {
  const index = layerList.findIndex((item) => item.attrs.id === shape.attrs.id)
  const [shapeData] = layerList.splice(index, 1)
  layerList.unshift(shapeData)
}
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
