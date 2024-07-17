import { createApp } from 'vue';
import { ElDialog, ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

const openCommonDialog = (params) => {
  let app;
  const div = document.createElement('div');
  div.classList.add('new-app-for-dialog');
  const destroy = () => {
    app?.unmount();
    div?.remove();
  };
  const { slots, onClose, ...restParams } = params;
  const proxyClose = () => {
    destroy();
    typeof onClose === 'function' && onClose();
  };
  const _params = { ...restParams, onClose: proxyClose, modelValue: true };

  const vnode = (
    <ElConfigProvider locale={zhCn}>
      <ElDialog {..._params}>{slots}</ElDialog>
    </ElConfigProvider>
  );
  app = createApp(vnode);
  app.mount(div);
  document.body.appendChild(div);

  return { destroy };
};
export default openCommonDialog;
