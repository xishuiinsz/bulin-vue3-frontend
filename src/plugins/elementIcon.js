import {
  Fold,
  Expand,
  Bell,
  CircleCloseFilled,
  UploadFilled
} from '@element-plus/icons-vue'
const iconList = [Fold, Expand, Bell, CircleCloseFilled, UploadFilled]
export default (app) => {
  iconList.forEach((icon) => app.component(icon.name, icon))
}
