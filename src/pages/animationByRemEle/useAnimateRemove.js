import { getCurrentInstance } from 'vue';
const useAnimateRemove = () => {
  const instance = getCurrentInstance();
  /**
   * @description 动画删除元素
   * @param {String} selector 元素选择器
   * @param {Function} callback 返回流程的回调
   */
  const removeByAnimate = (selector, callback) => {
    const root = instance.ctx.$el;
    if (root) {
      const element = root.querySelector(selector);
      const sibling = element.nextElementSibling;
      const leftElement = element.offsetLeft;
      const topElement = element.offsetTop;
      if (element) {
        element.animate(
          [
            {
              // from
              opacity: 1,
              transform: 'translate(0, 0)  rotate(0) scale(1)',
            },
            {
              // to
              transform: 'translate(200px, 400px) rotate(60deg) scale(0)',
              opacity: 0,
            },
          ],
          {
            duration: 500,
            iterations: 1,
          },
        );
        if (sibling) {
          const leftSibling = sibling.offsetLeft;
          const topSibling = sibling.offsetTop;
          sibling.animate(
            [
              {
                marginLeft: 0,
                margginTop: 0,
              },
              {
                marginLeft: `${leftElement - leftSibling}px`,
                marginTop: `${topElement - topSibling}px`,
              },
            ],
            {
              duration: 500,
              iterations: 1,
            },
          );
        }
      }
    }
    typeof callback === 'function' && callback();
  };
  return { removeByAnimate };
};
export default useAnimateRemove;
