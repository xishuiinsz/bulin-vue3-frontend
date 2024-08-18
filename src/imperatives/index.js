import { createApp, h } from 'vue';
import { ElConfigProvider, ElDescriptions, ElDescriptionsItem, ElTag } from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

const registerImperatives = (component, params, slots) => {
  let app;
  const div = document.createElement('div');
  div.classList.add('new-app-for-imperatives');
  const destroy = () => {
    app?.unmount();
    div?.remove();
  };

  const vnode = h(
    ElConfigProvider,
    { locale: zhCn },
    {
      default: () => h(component, params, slots),
    },
  );

  app = createApp(vnode);
  app.use(ElDescriptions);
  app.use(ElDescriptionsItem);
  app.use(ElTag);
  app.mount(div);
  document.body.appendChild(div);

  return { destroy };
};
export default registerImperatives;
