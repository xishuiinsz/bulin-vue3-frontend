<template>
    <div class="toolbar-generic-container">
        <component @moveToTop="moveToTopHandler" :is="currentComp" />
    </div>
</template>
<script>
export default {
    name: 'DesignToolbar'
}
</script>
<script setup>
import { computed, shallowRef } from 'vue';
import layerData from './layerData';
import stageTool from './stageTool.vue'
import circleTool from './circleTool.vue'
import imageTool from './imageTool.vue'
import textTool from './textTool.vue'
const props = defineProps({
    id: String,
    shape: Object
})
const currentComp = computed(() => {
    if (props.id) {
        const [findedRow] = layerData.filter(item => item.attrs.id === props.id)
        if (findedRow) {
            if (findedRow.type === 'Text') return textTool
            if (findedRow.type === 'Image') return imageTool
            if (findedRow.type === 'Circle') return circleTool
        }
    }
    return stageTool
})

// 置顶事件
const moveToTopHandler = () => {
    props.shape.moveToTop()
}
</script>