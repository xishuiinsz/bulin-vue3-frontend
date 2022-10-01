<template>
  <el-form label-width="120px">
    <el-form-item v-for="item in formList" :label="item.label">
      <el-input
        v-if="item.name === 'ElInput'"
        v-model="item.attrs.modelValue"
        @input="(value) => input(value, item)"
      />
      <el-select
        v-if="item.name === 'ElSelect'"
        v-model="item.attrs.modelValue"
      />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive } from 'vue'
const props = defineProps({
  formList: Array
})

const myFormList = reactive()
console.log(props.formList)
const input = (value, item) => {
  console.log(value, item)
  Object.assign(item.attrs, { modelValue: value })
}
</script>
