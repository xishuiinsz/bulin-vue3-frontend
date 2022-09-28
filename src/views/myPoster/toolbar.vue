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
      <el-button :disabled="validMoveup" @click="moveToUpEvt" type="primary"
        >上移一层</el-button
      >
      <el-button
        :disabled="textLock === '解锁'"
        @click="moveToDownEvt"
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
        @click="moveToDownpEvt"
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
<script setup name="DesignToolbar">
import { computed, inject } from 'vue'
import { getShageOptionById } from './utils'
import stageTool from './stageTool.vue'
import circleTool from './circleTool.vue'
import imageTool from './imageTool.vue'
import textTool from './textTool.vue'
import GroupTool from './GroupTool.vue'
import Konva from 'konva'
import last from 'lodash/last'
const emit = defineEmits(['destroyTransformer'])
const props = defineProps({
  id: String
})
const layerList = inject('layerList')
const shape = inject('currentShape')
// 根据id来渲染相应的shape
const currentComp = computed(() => {
  const findedRow = getShageOptionById(props.id, layerList)
  if (findedRow) {
    if (findedRow.type === 'Text') return textTool
    if (findedRow.type === 'Image') return imageTool
    if (findedRow.type === 'Circle') return circleTool
    if (findedRow.type === 'Group') return GroupTool
  }

  return stageTool
})

// 锁定
const textLock = computed(() => {
  const _textLock = ''
  if (shape.value.length === 1) {
    const [instanceShape] = shape.value
    return instanceShape.attrs.draggable ? '锁定' : '解锁'
  }
  return _textLock
})
// 锁定|解锁
const lockModify = (text) => {
  const [instanceShape] = shape.value
  const [shapeData] = layerList.filter(
    (item) => item.attrs.id === instanceShape.attrs.id
  )
  if (text === '锁定') {
    shapeData.attrs.draggable = false
  }
  if (text === '解锁') {
    shapeData.attrs.draggable = true
  }
}

// 上一步是否可用
const validMoveup = computed(() => {
  let flag = false
  if (shape.value.length === 1) {
    const [instanceShape] = shape.value
    if (!instanceShape.attrs.draggable) {
      flag = true
    }
    if (last(layerList).attrs.id === instanceShape.attrs.id) {
      flag = true
    }
  }
  return flag
})
// 上移一层
const moveToUpEvt = () => {
  const [instanceShape] = shape.value
  const index = layerList.findIndex(
    (item) => item.attrs.id === instanceShape.attrs.id
  )
  const [el] = layerList.splice(index, 1)
  layerList.splice(index + 1, 0, el)
}

// 组合
const textGroup = computed(() => {
  let _textGroup = ''
  if (shape.value.length === 1) {
    const [instanceShape] = shape.value
    if (instanceShape instanceof Konva.Group) {
      _textGroup = '取消组合'
    }
  }
  if (shape.value.length > 1) {
    _textGroup = '组合'
  }
  return _textGroup
})
// 组合|取消组合 公共事件
const groupModify = (text) => {
  const [instanceShape] = shape.value
  if (text === '取消组合') {
    const index = layerList.findIndex(
      (item) => item.attrs.id === instanceShape.attrs.id
    )
    const [groupData] = layerList.splice(index, 1)
    layerList.splice(index, 0, ...groupData.children)
    shape.value = []
  }
  if (text === '组合') {
    let indexArray = shape.value
      .map((s) => s.attrs.id)
      .map((id) => layerList.findIndex((item) => item.attrs.id === id))
    // 从大到小排序，先切割索引大的元素，后切割索引小的元素
    indexArray = indexArray.sort((a, b) => b - a)
    let shapesGroup = indexArray.map((index) => layerList.splice(index, 1))
    shapesGroup = shapesGroup.reduce((a, b) => a.concat(b))
    shapesGroup.forEach((item) => (item.attrs.draggable = false))
    const group = {
      type: 'Group',
      attrs: {
        id: '40',
        draggable: true
      },
      children: shapesGroup
    }
    const [index] = indexArray
    layerList.splice(index, 0, group)
  }
}

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

// 下移一层
const moveToDownEvt = () => {
  const index = layerList.findIndex((item) => item.attrs.id === props.id)
  if (index > -1) {
    const [el] = layerList.splice(index, 1)
    layerList.splice(index - 1, 0, el)
  }
}
// 置顶
const moveToTopEvt = () => {
  const index = layerList.findIndex((item) => item.attrs.id === props.id)
  if (index !== layerList.length - 1) {
    const [el] = layerList.splice(index, 1)
    layerList.push(el)
  }
}

// 置底
const moveToDownpEvt = () => {
  const index = layerList.findIndex((item) => item.attrs.id === props.id)
  const [shapeData] = layerList.splice(index, 1)
  layerList.unshift(shapeData)
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
