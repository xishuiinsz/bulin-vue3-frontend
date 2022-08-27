<template>
    <div class="circle-tool-container">circle Tool
        <el-button @click="moveToTopEvt" type="primary">置顶</el-button>
    </div>
</template>
<script setup>
const emit = defineEmits(['moveToTop'])
const moveToTopEvt = () => {
    emit('moveToTop')
}
</script>