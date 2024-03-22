import { reactive, ref } from 'vue'
import { fetchLayerData } from '@/api'
import { getMaxId } from '../utils'
const loadImage = (path) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous' // to avoid CORS if used with Canvas
    img.src = path
    img.onload = () => {
      resolve(img)
    }
    img.onerror = (e) => {
      reject(e)
    }
  })
}
const layerList = reactive([])
export const mainStageConfig = reactive({
  id: 'mainStageId',
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  strokeWidth: 0,
  stroke: '#fff',
  fill: 'rgb(50, 65, 87)',
  fillPatternImage: null
})
const useLayerList = () => {
  const isShowLoading = ref(true)
  fetchLayerData().then(async (resp) => {
    if (resp?.code === '000000') {
      const layerData = resp?.list || []
      const backgroundConfig = layerData.shift()
      backgroundConfig && Object.assign(mainStageConfig, backgroundConfig.attrs)
      if (layerData.length) {
        for (const item of layerData) {
          if (item.type === 'Image') {
            const img = await loadImage(item.attrs.image)
            item.attrs.image = img
          }
        }
      }
      isShowLoading.value = false
      layerList.push(...layerData)
    }
  })

  return { isShowLoading, layerList, mainStageConfig }
}
// 尾部新增图层
export const addLayerByTail = (type, item) => {
  const maxId = getMaxId(layerList)
  const layer = {
    type,
    attrs: { id: '' + (parseInt(maxId, 10) + 1), draggable: true, ...item }
  }
  layerList.push(layer)
}

export default useLayerList
