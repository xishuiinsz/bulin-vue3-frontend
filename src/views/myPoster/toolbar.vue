<template>
    <div class="toolbar-generic-container">
        <span v-if="nodeType === 'Stage'"></span>
        <span v-if="nodeType === 'Circle'"></span>
        <span></span>
    </div>
</template>
<script>
export default {
    name: 'DesignToolbar'
}
</script>
<script setup>
const props = defineProps({
    nodeType: String
})
</script>