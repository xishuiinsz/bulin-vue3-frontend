<template>
    <div class="text-tool-container">text Tool
        <el-button @click="moveToTopEvt" type="primary">置顶</el-button>
    </div>
</template>
<script setup>
const emit = defineEmits(['moveToTop'])
const moveToTopEvt = () => {
    emit('moveToTop')
}
</script>