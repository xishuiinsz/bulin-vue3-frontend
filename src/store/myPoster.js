import { defineStore } from 'pinia'

export const useMyPosterStore = defineStore('myPoster', {
  state: () => {
    return {
      scaleRate: 1
    }
  },
  getters: {},
  actions: {
    // 更新 缩放率
    setScaleRate(rate) {
      this.scaleRate = rate
    }
  }
})
