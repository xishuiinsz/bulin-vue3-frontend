import { defineStore } from 'pinia'

export const useMyPosterStore = defineStore('myPoster', {
  state: () => {
    return {
      stageNode: null
    }
  },
  getters: {},
  actions: {
    // update stage node
    setStageNode(instance) {
      this.stageNode = instance.getNode()
    }
  }
})
