import { Fold, Expand, Bell, CircleCloseFilled } from '@element-plus/icons-vue'
const iconList = [Fold, Expand, Bell, CircleCloseFilled]
export default (app) => {
  iconList.forEach((icon) => app.component(icon.name, icon))
}
