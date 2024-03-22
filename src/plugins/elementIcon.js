import { Fold, Expand, Bell, CircleCloseFilled, UploadFilled, UserFilled } from '@element-plus/icons-vue';
const iconList = [Fold, Expand, Bell, CircleCloseFilled, UploadFilled, UserFilled];
export default (app) => {
  iconList.forEach((icon) => app.component(icon.name, icon));
};
