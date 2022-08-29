<template>
    <div class="toolbar-generic-container">
        <el-button-group v-show="isShowCommonTool">
            <el-button @click="deleteHandler" type="primary">删除</el-button>
        </el-button-group>
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
    id: String
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
const shape = inject('currentShape')
// 判断是否显示公共工具条
const isShowCommonTool = computed(() => {
    let flag = false
    if (shape.value && shape.value.nodeType !== 'Stage') {
        flag = true
    }
    return flag
})
// 删除shape事件
const deleteHandler = () => {
    const index = layerList.findIndex(item => item.attrs.id === props.id)
    if (index > -1) {
        layerList.splice(index, 1)
        emit('destroyTransformer')
    }
}
</script>