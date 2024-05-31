// 指令式Tooltip
import { ElTooltip } from 'element-plus';
import { h, render } from 'vue';
const showTooltip = (target, options = {}) => {
  if (target.scrollWidth > target.offsetWidth) {
    const props = {
      visible: true,
      'virtual-ref': target,
      content: target.innerText,
      ...options,
    };
    const vnode = h(ElTooltip, props);
    render(vnode, document.body);
    const hideAfter = options['hide-after'] || options['hideAfter'];
    hideAfter !== 0 && target.addEventListener('mouseleave', () => render(null, document.body));
  }
};

export default showTooltip;
