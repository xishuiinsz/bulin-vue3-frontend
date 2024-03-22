<template>
    <el-select v-model="value" :placeholder="props.placeholder">
        <el-option v-for="item in props.options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
</template>

<script setup>
import { computed } from 'vue';
import { ElOption, ElSelect } from 'element-plus'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {

    },
    placeholder: {
        type: String,
        default: ''
    },
    options: {
        type: Array,
        default: () => []
    }
})
const value = computed({
    get: function () {
        return props.modelValue
    },
    set: function (value) {
        emit('update:modelValue', value)
    }
})
</script>
