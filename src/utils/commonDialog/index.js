import { render, h } from 'vue';
import { ElDialog } from 'element-plus';
const openCommonDialog = (params) => {
  const div = document.createElement('div');
  const { content, ...restParams } = params;
  const _params = { ...restParams, modelValue: true };
  const slots = {};
  if (content) {
    Object.assign(slots, { default: () => h(content) });
  }
  const vnode = h(ElDialog, _params, slots);
  render(vnode, div);
  document.body.appendChild(div);
  const destroy = () => {
    render(null, div);
    div?.remove();
  };
  return { destroy };
};
export default openCommonDialog;
