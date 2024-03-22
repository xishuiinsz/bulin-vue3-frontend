<template>
    <template v-for="item in  props.layerList" :key="item.id">
        <template v-if="!item?.children || item?.children?.length === 1">
            <div :data-id="item.id" class="layer-item" :class="getLayerClass(item)" v-html="item.html"
                :style="getLayerStyle(item)">
            </div>
        </template>
        <template v-else>
            <div :data-id="item.id" class="layer-item" :class="getLayerClass(item)" :style="getLayerStyle(item)">
                <layersComponent :layer-list="item.children" />
            </div>
        </template>
    </template>
</template>
<script setup>
import layersComponent from './layersComponent.vue';
const props = defineProps({
    layerList: {
        type: Array,
        default: () => []
    }
})
const getLayerStyle = data => {
    const { width, height, left, top } = data
    return {
        width: `${width}px`,
        height: `${height}px`,
        left: `${left}px`,
        top: `${top}px`,
    }
}
const getLayerClass = data => {
    let className = data.type;
    if (data.isActive) {
        className += ' is-active'
    }
    return className
}
</script>
