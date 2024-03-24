import { onMounted } from "vue";
import { isRef, onUnmounted } from "vue";
let ro;
const useResizeObserver = (el, resizeCallbak) => {
    const initResizeObserver = () => {
        const element = isRef(el) ? el.value : el
        const roCallback = (entries) => {
            entries.forEach((entry) => {
                resizeCallbak(entry)
            });
        };
        ro = new ResizeObserver(roCallback);
        ro.observe(element);
    }
    const destroy = (observer) => {
        observer?.unobserve();
        observer?.disconnect();
    }
    onMounted(initResizeObserver)
    onUnmounted(destroy)
}

export default useResizeObserver;