import { ElTooltip } from 'element-plus';
import { h, render } from 'vue';

/**
 * @description 命令式(编程式)调用ElTooltip组件
 * @param {HTMLElement} target tooltip关联的元素
 * @param {Object} options tooltip的配置项
 */
const showTooltip = (target, options = {}) => {
  if (target.scrollWidth > target.offsetWidth || target.scrollHeight > target.offsetHeight) {
    const props = {
      visible: true,
      'virtual-ref': target,
      'virtual-triggering': true,
      content: target.innerText,
      ...options,
    };
    const vnode = h(ElTooltip, props);
    render(vnode, document.body);
    const hideAfter = options['hide-after'] || options['hideAfter'];
    const destroy = () => {
      render(null, document.body);
    };
    hideAfter !== 0 && target.addEventListener('mouseleave', destroy);
    target.addEventListener('click', destroy);
  }
};

export default showTooltip;
