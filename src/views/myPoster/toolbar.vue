<template>
    <div class="toolbar-generic-container">
        <span v-if="nodeType === 'Stage'">画布</span>
        <span v-if="nodeType === 'Circle'">圆形</span>
        <span v-if="nodeType === 'Text'">文本</span>
        <span v-if="nodeType === 'Image'">图片</span>
    </div>
</template>
<script>
export default {
    name: 'DesignToolbar'
}
</script>
<script setup>
import { computed } from 'vue';
import layerData from './layerData';
const props = defineProps({
    id: String
})

const nodeType = computed(() => {
    let nodeType = 'Stage'
    if (props.id) {
        const [findedRow] = layerData.filter(item => item.attrs.id === props.id)
        if (findedRow) {
            nodeType = findedRow.type
        }
    }
    return nodeType
})
</script>