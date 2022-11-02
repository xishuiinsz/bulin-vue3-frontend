import { reactive, ref } from 'vue'
import { fetchLayerData } from '@/api'

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

const useLayerList = () => {
  const isShowLoading = ref(true)
  const layerList = reactive([])
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
  return { isShowLoading, layerList }
}

export default useLayerList
