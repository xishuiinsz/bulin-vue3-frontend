<template>
  <el-checkbox-group v-model="myValue">
    <el-checkbox v-for="item in options" :label="item.label" :value="item.label" name="type" />
  </el-checkbox-group>
</template>

<script setup>
import { computed } from 'vue';
import { ElCheckbox, ElCheckboxGroup } from 'element-plus';
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {},
  placeholder: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
});
const myValue = computed({
  get: function () {
    return props.modelValue;
  },
  set: function (value) {
    emit('update:modelValue', value);
  },
});
</script>
