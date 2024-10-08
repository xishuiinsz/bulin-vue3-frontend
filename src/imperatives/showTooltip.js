import { ElTooltip } from 'element-plus';
import { h, render } from 'vue';

// 消除body上的zoom导致的tooltip错位。
let tooltipWrap;

/**
 * @description 命令式(编程式)调用ElTooltip组件
 * @param {HTMLElement} target tooltip关联的元素
 * @param {Object} options tooltip的配置项
 */
const showTooltip = (target, options = {}) => {
  if (target.scrollWidth > target.offsetWidth || target.scrollHeight > target.offsetHeight) {
    if (!tooltipWrap) {
      tooltipWrap = document.createElement('div');
      Object.assign(tooltipWrap.style, {
        position: 'fixed',
        width: '100%',
        inset: '0px auto auto 0px',
        pointerEvents: 'none',
      });
      document.body.appendChild(tooltipWrap);
    }
    const props = {
      visible: true,
      'virtual-ref': target,
      'virtual-triggering': true,
      content: target.innerText,
      'append-to': tooltipWrap,
      ...options,
    };
    const vnode = h(ElTooltip, props);
    render(vnode, tooltipWrap);
    const hideAfter = options['hide-after'] || options['hideAfter'];
    const destroy = () => {
      render(null, tooltipWrap);
    };
    hideAfter !== 0 && target.addEventListener('mouseleave', destroy);
    target.addEventListener('click', destroy);
  }
};

export default showTooltip;
