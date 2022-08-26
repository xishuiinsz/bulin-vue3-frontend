<template>
    <k-circle v-if="type === 'circle'" :config="attrs"></k-circle>
    <k-text v-if="type === 'text'" :config="attrs"></k-text>
    <k-image v-if="type === 'image'" :config="attrs"></k-image>
</template>
<script setup>
const props = defineProps({
    type: String,
    attrs: Object
})
</script>

