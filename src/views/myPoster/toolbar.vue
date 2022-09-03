<template>
    <div class="toolbar-generic-container">
        <el-button-group class="common-btn-actions" v-show="isShowCommonTool">
            <el-button @click="deleteHandler" type="primary">删除</el-button>
            <el-button @click="moveToUpEvt" type="primary">上移</el-button>
            <el-button @click="moveToTopEvt" type="primary">置顶</el-button>
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
const emit = defineEmits(['destroyTransformer', 'layerCanvasUpdate'])
const props = defineProps({
    id: String
})

// 根据id来渲染相应的shape
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
// 上移一层
const moveToUpEvt = () => {
    const index = layerList.findIndex(item => item.attrs.id === props.id)
    if (index !== layerList.length - 1) {
        const [el] = layerList.splice(index, 1)
        layerList.splice(index + 1, 0, el)
        emit('layerCanvasUpdate')
    }
}
// 置顶
const moveToTopEvt = () => {
    console.log('置顶');
}
</script>
<style lang="scss" scoped>
.toolbar-generic-container {
    ::v-deep .common-btn-actions {
        display: flex;
        flex-direction: column;
        row-gap: 12px;
    }
}
</style>