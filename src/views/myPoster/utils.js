export const getShageOptionById = (id, shageList) => {
  let option
  for (let index = 0; index < shageList.length; index++) {
    const element = shageList[index]
    if (element.attrs && element.attrs.id === id) {
      option = element
      break
    }
    if (element.children && element.children.length) {
      return getShageOptionById(id, element.children)
    }
  }
  return option
}

export const getMaxId = (layerList, id = '1') => {
  let _id = id
  layerList.forEach((layer) => {
    if (layer.attrs.id > _id) {
      _id = layer.attrs.id
    }
    if (layer.children && layer.children.length) {
      getMaxId(layer.children, _id)
    }
  })
  return _id
}

export const downloadURI = (uri, name = Date.now()) => {
  const link = document.createElement('a')
  link.download = name
  link.href = uri
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 获取工作台父级容器
export const getOuterWeorkbench = () => {
  const outerWorkbench = document.querySelector('.outer-konva-stage>div')
  return outerWorkbench
}

// 设置画布缩放率
export const setStageScale = (scaleValue) => {
  const outerWorkbench = getOuterWeorkbench()
  outerWorkbench.style.transform = `scale(${scaleValue})`
}

// 计算合适的缩放率
export const computedFitScale = (...stageSize) => {
  const spaceValue = 150
  const outerContainer = getOuterWeorkbench()
  const outerContainerStyle = getComputedStyle(outerContainer)
  // 宽度计算
  const totalWidth = parseFloat(outerContainerStyle.width)
  const avaliableWidth = totalWidth - spaceValue * 2

  // 高度计算
  const totalHeight = parseFloat(outerContainerStyle.height)
  const avaliableHeight = totalHeight - spaceValue * 2

  const [stageWidth, stageHeight] = stageSize
  let scale = 1
  // 画布宽高都大于可用宽高
  if (stageWidth > avaliableWidth && stageHeight > avaliableHeight) {
    if (stageWidth / stageHeight > avaliableWidth / avaliableHeight) {
      scale = avaliableWidth / stageWidth
    }
    if (stageHeight / stageWidth > avaliableHeight / avaliableWidth) {
      scale = avaliableHeight / stageHeight
    }
  }
  // 画布宽度大于可用宽度且画布高度小于可用高度
  if (stageWidth > avaliableWidth && stageHeight < avaliableHeight) {
    scale = avaliableWidth / stageWidth
  }
  // 画布宽度小于可用宽度且画布高度大于可用高度
  if (stageWidth < avaliableWidth && stageHeight > avaliableHeight) {
    scale = avaliableHeight / stageHeight
  }
  return scale
}
