import { computed } from 'vue'
import last from 'lodash/last'
import first from 'lodash/first'
import Konva from 'konva'
import { anchorsTrnasformer } from '../config'
import { ElMessage } from 'element-plus'
// 图层删除hook
export const useLayerDelete = (shape, layerList, cb) => {
  const availableDeleteLayer = computed(() => {
    return shape.value.some((s) => !s.attrs.draggable)
  })
  // 删除shape事件
  const deleteLayerHandler = () => {
    if (shape.value.length >= layerList.length) {
      ElMessage.error({
        message: '至少保留一个元素(shape)!'
      })
      return
    }
    shape.value
      .map((item) => item.attrs.id)
      .sort((a, b) => b - a)
      .forEach((id) => {
        const index = layerList.findIndex((item) => item.attrs.id === id)
        if (index > -1) {
          layerList.splice(index, 1)
          typeof cb === 'function' && cb()
        }
      })
  }
  return {
    availableDeleteLayer,
    deleteLayerHandler
  }
}
// 上移一层
export const useMoveupLayer = (shape, layerList) => {
  // 上移一层 是否可用
  const availableMoveup = computed(() => {
    if (shape.value.length > 1) return true
    let flag = true
    if (shape.value.length === 1) {
      const [instanceShape] = shape.value
      if (
        instanceShape.attrs.draggable &&
        last(layerList).attrs.id !== instanceShape.attrs.id
      ) {
        flag = false
      }
    }
    return flag
  })
  // 上移一层 点击事件
  const moveToUpEvt = () => {
    const [instanceShape] = shape.value
    const index = layerList.findIndex(
      (item) => item.attrs.id === instanceShape.attrs.id
    )
    const [el] = layerList.splice(index, 1)
    layerList.splice(index + 1, 0, el)
  }
  return {
    availableMoveup,
    moveToUpEvt
  }
}

// 下移一层
export const useMovedownLayer = (shape, layerList) => {
  // 下移一层 是否可用
  const availableMovedown = computed(() => {
    let flag = true
    if (shape.value.length === 1) {
      const [instanceShape] = shape.value
      if (
        instanceShape.attrs.draggable &&
        first(layerList).attrs.id !== instanceShape.attrs.id
      ) {
        flag = false
      }
    }
    return flag
  })

  // 下移一层
  const moveTodownEvt = () => {
    const [instanceShape] = shape.value
    const index = layerList.findIndex(
      (item) => item.attrs.id === instanceShape.attrs.id
    )
    if (index > -1) {
      const [el] = layerList.splice(index, 1)
      layerList.splice(index - 1, 0, el)
    }
  }

  return {
    availableMovedown,
    moveTodownEvt
  }
}

// 置顶hook
export const useMoveToTop = (shape, layerList) => {
  const availableMoveToTop = computed(() => {
    if (shape.value.length > 1) return true
    let flag = true
    if (shape.value.length === 1) {
      const [instanceShape] = shape.value
      if (
        instanceShape.attrs.draggable &&
        last(layerList).attrs.id !== instanceShape.attrs.id
      ) {
        flag = false
      }
    }
    return flag
  })
  // 置顶
  const moveToTopEvt = () => {
    const [instanceShape] = shape.value
    const index = layerList.findIndex(
      (item) => item.attrs.id === instanceShape.attrs.id
    )
    if (index !== layerList.length - 1) {
      const [el] = layerList.splice(index, 1)
      layerList.push(el)
    }
  }
  return {
    availableMoveToTop,
    moveToTopEvt
  }
}

// 置底hook
export const useMoveToBottom = (shape, layerList) => {
  const availableMoveToBottom = computed(() => {
    let flag = true
    if (shape.value.length === 1) {
      const [instanceShape] = shape.value
      if (
        instanceShape.attrs.draggable &&
        first(layerList).attrs.id !== instanceShape.attrs.id
      ) {
        flag = false
      }
    }
    return flag
  })
  // 置底
  const moveToBottomEvt = () => {
    const [instanceShape] = shape.value
    const index = layerList.findIndex(
      (item) => item.attrs.id === instanceShape.attrs.id
    )
    const [shapeData] = layerList.splice(index, 1)
    layerList.unshift(shapeData)
  }
  return {
    availableMoveToBottom,
    moveToBottomEvt
  }
}

// 锁定
export const useLockModify = (shape, layerList) => {
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
    const tr = instanceShape.getStage().findOne('#mainTransfer')
    const [shapeData] = layerList.filter(
      (item) => item.attrs.id === instanceShape.attrs.id
    )
    if (text === '锁定') {
      shapeData.attrs.draggable = false
      instanceShape.attrs.draggable = false
      tr.setAttrs({
        borderStroke: '#c0c4cc',
        rotateEnabled: false,
        enabledAnchors: []
      })
    }
    if (text === '解锁') {
      tr.setAttrs({
        borderStroke: '#337ecc',
        rotateEnabled: true,
        enabledAnchors: anchorsTrnasformer
      })
      shapeData.attrs.draggable = true
      instanceShape.attrs.draggable = true
    }
  }
  return {
    textLock,
    lockModify
  }
}

// 组合
export const useGroupModify = (shape, layerList) => {
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
      shapesGroup.reverse()
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
  return {
    textGroup,
    groupModify
  }
}
