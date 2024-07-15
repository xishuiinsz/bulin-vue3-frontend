import { render, h } from 'vue';
import { ElDialog, ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

const openCommonDialog = (params) => {
  const div = document.createElement('div');
  const { slots, ...restParams } = params;
  const _params = { ...restParams, modelValue: true };

  const vnode = (
    <ElConfigProvider locale={zhCn}>
      <ElDialog {..._params}>{slots}</ElDialog>
    </ElConfigProvider>
  );
  render(vnode, div);
  document.body.appendChild(div);
  const destroy = () => {
    render(null, div);
    div?.remove();
  };
  return { destroy };
};
export default openCommonDialog;
