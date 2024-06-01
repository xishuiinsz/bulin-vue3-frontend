// 命令式调用ElDialog组件
import { render, h } from 'vue';
import { ElDialog } from 'element-plus';
let dialogWrap = null;
const showDialog = (params) => {
  const { slots, ...restParams } = params;
  const vnode = h(ElDialog, { ...restParams, modelValue: true }, slots);
  if (!dialogWrap) {
    dialogWrap = document.createElement('div');
    dialogWrap.classList.add('show-dialog-wrap');
  }
  render(vnode, dialogWrap);
  document.body.appendChild(dialogWrap);
  return { destroy: () => render(null, dialogWrap) };
};
export default showDialog;
