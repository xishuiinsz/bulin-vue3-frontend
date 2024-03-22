const countKey = '_count'
export default {
  created: function (el, binding, vnode) {
    // const { instance, value } = binding
    // const lazyAfterNum = value.lazyAfter
    // if (!Object.prototype.hasOwnProperty.call(instance, countKey)) {
    //   instance[countKey] = 0
    // } else {
    //   instance[countKey] += 1
    // }
    // if (instance[countKey] > lazyAfterNum) {
    //   el.setAttribute('loading', 'lazy')
    // }
  },
  mounted(el) {
    const obCallback = (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          entry.target.setAttribute('loading', 'lazy')
        }
      })
    }
    const ob = new IntersectionObserver(obCallback)
    ob.observe(el)
  },
}
