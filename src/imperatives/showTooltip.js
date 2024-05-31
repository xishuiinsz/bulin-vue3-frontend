// 指令式Tooltip
import { ElTooltip } from "element-plus";
import { h, render } from 'vue';
let tooltipWrap = null;
const showTooltip = (target, options ={}) =>{
  if (target.scrollWidth > target.offsetWidth) {
    if (!tooltipWrap) {
      tooltipWrap = document.createElement('div');
      tooltipWrap.classList.add('tooltip-wrap');
    }
    const props = {
      visible: true, 'virtual-ref': target, content: target.innerText, ...options
    };
    const vnode = h(ElTooltip, props);
    document.body.appendChild(tooltipWrap);
    render(vnode, tooltipWrap);
    target.addEventListener('mouseleave', () => {
      render(null, tooltipWrap);
    })
  }
}

export default showTooltip;