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
const useLayerList = () => {
  const isShowLoading = ref(true)
  fetchLayerData().then(async (resp) => {
    if (resp?.code === '000000') {
      const layerData = resp?.list || []
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

  // 尾部新增图层
  const addLayerByTail = (type, item) => {
    const maxId = 100
    const layer = {
      type,
      attrs: { id: '' + (parseInt(maxId, 10) + 1), draggable: true, ...item }
    }
    layerList.push(layer)
  }
  return { isShowLoading, layerList, addLayerByTail }
}

export default useLayerList
