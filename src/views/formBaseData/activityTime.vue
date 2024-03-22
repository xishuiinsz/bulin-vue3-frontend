<template>
  <div class="d-flex w-100">
    <el-date-picker class="flex-fill" v-model="date" type="date" value-format="YYYY-MM-DD" placeholder="Pick a date" />
    <span class="el-range-separator px-8">-</span>
    <el-time-picker class="flex-fill" v-model="time" value-format="HH:mm:ss" placeholder="Pick a time" />
  </div>
</template>
<script setup>
import { computed } from 'vue'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => ['', '']
  }
})
const date = computed({
  get: function () {
    return props.modelValue[0]
  },
  set: function (value) {
    const _value = [value, props.modelValue[1]]
    emit('update:modelValue', _value)
  },
})
const time = computed({
  get: function () {
    return props.modelValue[1]
  },
  set: function (value) {
    const _value = [props.modelValue[0], value]
    emit('update:modelValue', _value)
  },
})
</script>
