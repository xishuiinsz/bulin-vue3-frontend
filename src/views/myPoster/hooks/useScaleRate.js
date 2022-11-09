import { ref, watch } from 'vue'
import { useMyPosterStore } from '@/store/myPoster'
import { setStageScale } from '../utils'
const myPosterStore = useMyPosterStore()
const useScaleRate = () => {
  const scaleRate = ref(myPosterStore.scaleRate)
  // 监听scaleRate计算的结果
  watch(
    () => myPosterStore.scaleRate,
    (newRate) => {
      scaleRate.value = newRate
    }
  )
  // 手工改变scaleRate
  const changeScaleRate = (value) => {
    scaleRate.value = value
    setStageScale(value)
  }
  return { scaleRate, changeScaleRate }
}
export default useScaleRate
