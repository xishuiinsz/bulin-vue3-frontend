import { defineStore } from 'pinia'
import { fetchLayerData } from '@/api'
export const useMyPosterStore = defineStore('myPoster', {
  state: () => {
    return {
      scaleRate: 1,
      layerData: []
    }
  },
  getters: {},
  actions: {
    // 获取图层列表数据
    async fetchLayerData() {
      const resp = await fetchLayerData()
      if (resp?.code === '000000') {
        this.layerData = resp?.list || []
      }
    }
  }
})
