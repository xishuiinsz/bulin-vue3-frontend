<template>
    <k-circle v-if="type === 'Circle'" :config="attrs"></k-circle>
    <k-text v-if="type === 'Text'" :config="attrs"></k-text>
    <k-image v-if="type === 'Image'" :config="attrs"></k-image>
</template>
<script setup>
const props = defineProps({
    type: String,
    attrs: Object
})
</script>

