import { ref, nextTick } from 'vue'
import { useMyPosterStore } from '@/store/myPoster'
import floor from 'lodash/floor'
const scaleRate = ref(1)

// 获取工作台父级容器
export const getOuterWeorkbench = () => {
  const outerContainer = document.querySelector('.outer-konva-stage>div')
  return outerContainer
}

// update salce value by stage 设置画布缩放率
export const setStageScale = (scaleValue, stageSize) => {
  const [width] = stageSize
  const myPosterStore = useMyPosterStore()
  const stageDom = myPosterStore.stageNode.content
  stageDom.style.transformOrigin = 'left center'
  const outerContainer = getOuterWeorkbench()
  const outerContainerStyle = getComputedStyle(outerContainer)
  const totalWidth = parseFloat(outerContainerStyle.width)
  const offsetX = (totalWidth - width * scaleValue) / 2
  stageDom.style.left = `${offsetX}px`
  stageDom.style.transform = `scale(${scaleValue})`
}

//  computing fit scale value  计算合适的缩放率
export const computedFitScale = (...stageSize) => {
  const spaceValue = (window.innerWidth / 1920) * 100
  const outerContainer = getOuterWeorkbench()
  const outerContainerStyle = getComputedStyle(outerContainer)
  // 宽度计算
  const totalWidth = parseFloat(outerContainerStyle.width)
  const avaliableWidth = totalWidth - spaceValue * 2

  // 高度计算
  const totalHeight = parseFloat(outerContainerStyle.height)
  const avaliableHeight = totalHeight - spaceValue * 2

  const [stageWidth, stageHeight] = stageSize
  let scale
  // 画布宽高都大于可用宽高
  if (stageWidth > avaliableWidth && stageHeight > avaliableHeight) {
    if (stageWidth / stageHeight > avaliableWidth / avaliableHeight) {
      scale = avaliableWidth / stageWidth
    } else if (stageHeight / stageWidth > avaliableHeight / avaliableWidth) {
      scale = avaliableHeight / stageHeight
    }
  } else if (stageWidth > avaliableWidth && stageHeight < avaliableHeight) {
    scale = avaliableWidth / stageWidth
  } else if (stageWidth < avaliableWidth && stageHeight > avaliableHeight) {
    scale = avaliableHeight / stageHeight
  } else {
    scale = 1.0
  }
  scale = floor(scale, 1)
  return scale
}

//  manually change the scale value 手工改变scaleRate
export const changeScaleRate = (value, ...stageSize) => {
  scaleRate.value = value
  setTimeout(() => {
    setStageScale(value, stageSize)
  }, 200)
}

const useScaleRate = () => {
  return { scaleRate }
}

export default useScaleRate
