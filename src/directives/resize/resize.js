const map = new WeakMap();
const roCallback = (entries) => {
  entries.forEach((entry) => {
    const bindingValue = map.get(entry.target);
    typeof bindingValue === 'function' && bindingValue(entry);
  });
};
const ro = new ResizeObserver(roCallback);
export default {
  mounted(el, binding) {
    map.set(el, binding.value);
    ro.observe(el);
  },
  unmounted(el, binding) {
    ro.unobserve(el);
  },
};
