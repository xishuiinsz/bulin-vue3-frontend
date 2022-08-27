<template>
    <div class="toolbar-generic-container">
        <el-button @click="moveToTopHandler" type="primary">置顶</el-button>
        <el-button @click="deleteHandler" type="primary">删除</el-button>
        <component :is="currentComp" />
    </div>
</template>
<script>
export default {
    name: 'DesignToolbar'
}
</script>
<script setup>
import { computed, inject } from 'vue';
import layerData from './layerData';
import stageTool from './stageTool.vue'
import circleTool from './circleTool.vue'
import imageTool from './imageTool.vue'
import textTool from './textTool.vue'
const emit = defineEmits(['destroyTransformer'])
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
const layerList = inject('layerList')
// 置顶事件
const moveToTopHandler = () => {
    props.shape.moveToTop()
}
// 删除事件
const deleteHandler = () => {
    const index = layerList.findIndex(item => item.attrs.id === props.id)
    if (index > -1) {
        layerList.splice(index, 1)
        emit('destroyTransformer')
    }
}
</script>