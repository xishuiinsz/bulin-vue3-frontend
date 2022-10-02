<template>
  <el-form label-width="120px">
    <el-form-item v-for="item in formList" :label="item.label">
      <el-input
        v-if="item.name === 'ElInput'"
        :modelValue="getModelValue(item.key)"
        @input="input(item.key, $event)"
      />
      <el-input-number
        v-if="item.name === 'ElInputNumber'"
        :modelValue="getModelValue(item.key)"
        @change="input(item.key, $event)"
      />
      <el-select
        v-if="item.name === 'ElSelect'"
        :modelValue="getModelValue(item.key)"
        @change="change(item.key, $event)"
      >
        <el-option
          v-for="subitem in item.options"
          :key="subitem.value"
          :label="subitem.label"
          :value="subitem.value"
        />
      </el-select>
      <el-color-picker
        v-if="item.name === 'ElColorPicke'"
        :modelValue="getModelValue(item.key)"
        @change="input(item.key, $event)"
      />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
const props = defineProps({
  formList: Array
})

const emit = defineEmits(['formChange'])

// 根据props生成自己的响应式数据
const myFormList = reactive(
  props.formList.map((item) => {
    return { modelValue: ref(item.attrs.initValue), key: item.key }
  })
)

// 关于v-model关联值
const getModelValue = (key) => {
  const [row] = myFormList.filter((item) => item.key === key)
  return row.modelValue
}

// 公用input输入事件
const input = (key, value) => {
  const [row] = myFormList.filter((item) => item.key === key)
  row.modelValue = value
  emit('formChange', myFormList, key)
}

// 公用change输入事件
const change = (key, value) => {
  const [row] = myFormList.filter((item) => item.key === key)
  row.modelValue = value
  emit('formChange', myFormList, key)
}
</script>
<script>
export default {
  name: 'MyForm'
}
</script>
