import { isRef, onMounted, onUnmounted } from 'vue';
// 滚动条所在的窗口
let scrollContainer;

// 滚动事件回调队列
const queues = [];

const scrollEvtCallback = (e) => {
  queues?.length && queues.forEach((func) => typeof func === 'function' && func(e));
};

/**
 * 反注册scroll事件的回调
 *
 * @param {Function} callback
 */
export const unregScrollEvtCallback = (callback) => {
  const index = queues.findIndex((item) => item === callback);
  if (index > -1) {
    queues.splice(index, 1);
  }
};

/**
 * 注册scroll事件的回调
 *
 * @param {Function} callback
 */
export const useScrollEvtCallback = (callback) => {
  !queues.includes(callback) && queues.push(callback);
  onUnmounted(() => unregScrollEvtCallback(callback));
};

// 绑定scroll事件
export const useBindScrollEvt = (params) => {
  const addScrollListener = () => {
    if (isRef(params)) {
      scrollContainer = params.value;
    } else if (typeof params === 'string') {
      scrollContainer = document.querySelector(params.startsWith('.') ? params : `.${params}`);
    } else if (params instanceof HTMLElement) {
      scrollContainer = params;
    }
    if (!scrollContainer) {
      throw new Error('useBindScrollEvt Hook必须指定1个有效的html元素或1个元素选择器或ref元素');
    }
    scrollContainer.addEventListener('scroll', scrollEvtCallback);
  };
  const removeScrollListener = () => {
    scrollContainer?.removeEventListener('scroll', scrollEvtCallback);
  };
  onMounted(addScrollListener);
  onUnmounted(removeScrollListener);
};
