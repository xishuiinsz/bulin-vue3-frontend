import chinaCitiesPicker from './chinaCitiesPicker.vue'
/**
 * 注册组件
 *
 * @param {App<Element>} app 根组件实例
 */
const install = (app) => {
  app.component('chinaCitiesPicker', chinaCitiesPicker)
}
export default install
