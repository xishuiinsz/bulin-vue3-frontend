<template>
    <el-radio-group v-model="myValue">
        <el-radio v-for="item in options" :label="item.value" :key="item.value">
            {{ item.label }}
        </el-radio>
    </el-radio-group>
</template>

<script setup>
import { computed } from 'vue';
import { ElRadio, ElRadioGroup } from 'element-plus'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    placeholder: {
        type: String,
        default: ''
    },
    options: {
        type: Array,
        default: () => []
    }
})
const myValue = computed({
    get: function () {
        return props.modelValue
    },
    set: function (value) {
        emit('update:modelValue', value)
    }
})
</script>
