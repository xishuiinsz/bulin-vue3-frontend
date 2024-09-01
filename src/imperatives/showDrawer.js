import { ElDrawer } from 'element-plus';
import registerImperatives from '@/imperatives';

const showDrawer = (params) => {
  const { slots, onClose, ...restParams } = params;
  let drawerInstance;
  const proxyClose = () => {
    drawerInstance?.destroy();
    typeof onClose === 'function' && onClose();
  };
  const _params = { ...restParams, onClose: proxyClose, modelValue: true };
  drawerInstance = registerImperatives(ElDrawer, _params, slots);
  return drawerInstance;
};
export default showDrawer;
