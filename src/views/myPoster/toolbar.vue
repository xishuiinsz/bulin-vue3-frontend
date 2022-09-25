<template>
  <div class="toolbar-generic-container">
    <el-button-group class="common-btn-actions" v-show="isShowCommonTool">
      <el-button @click="deleteHandler" type="primary">删除</el-button>
      <el-button @click="moveToUpEvt" type="primary">上移一层</el-button>
      <el-button @click="moveToDownEvt" type="primary">下移一层</el-button>
      <el-button @click="moveToTopEvt" type="primary">置顶</el-button>
      <el-button @click="moveToDownpEvt" type="primary">置底</el-button>
      <el-button v-if="isShowLock" @click="lockModify" type="primary"
        >锁定 | 取消锁定</el-button
      >
    </el-button-group>
    <component :is="currentComp" />
  </div>
</template>
<script setup name="DesignToolbar">
import { computed, inject, watch } from 'vue'
import { getShageOptionById } from './utils'
import stageTool from './stageTool.vue'
import circleTool from './circleTool.vue'
import imageTool from './imageTool.vue'
import textTool from './textTool.vue'
import GroupTool from './GroupTool.vue'
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

const isShowLock = computed(() => {
  return true
})

watch(
  () => props.id,
  () => {
    console.log('props.id', props.id)
  }
)

// 判断是否显示公共工具条
const isShowCommonTool = computed(() => {
  let flag = false
  if (shape.value && shape.value.nodeType !== 'Stage') {
    flag = true
  }
  return flag
})
// 删除shape事件
const deleteHandler = () => {
  const index = layerList.findIndex((item) => item.attrs.id === props.id)
  if (index > -1) {
    layerList.splice(index, 1)
    emit('destroyTransformer')
  }
}
// 上移一层
const moveToUpEvt = () => {
  const index = layerList.findIndex((item) => item.attrs.id === props.id)
  if (index !== layerList.length - 1) {
    const [el] = layerList.splice(index, 1)
    layerList.splice(index + 1, 0, el)
  }
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

// 锁定|解锁
const lockModify = () => {
  const index = layerList.findIndex((item) => item.attrs.id === props.id)
  const { attrs } = layerList[index]
  Object.assign(attrs, {
    draggable: !attrs.draggable
  })
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
