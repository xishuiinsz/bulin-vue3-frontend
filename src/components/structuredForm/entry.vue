<template>
  <el-form class="structured-el-form" v-bind="props.formOptions">
    <el-form-item :label="item.label" v-for="item in props.formItemList">
      <template v-if="Object.prototype.hasOwnProperty.call(item, 'help')" #label="scope">
        {{ scope.label }}
        <el-tooltip class="item" effect="dark" :content="item.help" placement="top">
          <span class="icon-20 icon-help"></span>
        </el-tooltip>
      </template>
      <component v-model="form[item.key]" v-bind="item.props" :is="getComponent(item.type)" />
    </el-form-item>
  </el-form>
</template>
<script setup>
import { watch, reactive, resolveComponent, toRaw } from 'vue';
const emit = defineEmits(['formDataCast'])

const props = defineProps({
  formOptions: {
    type: Object,
    default: () => { }
  },
  formItemList: {
    type: Array,
    default: () => [],
  },
});
// 表单响应式对象
const form = reactive({
});

// “重置”逻辑
const reset = () => {
  props.formItemList.forEach(item => {
    const { key, initValue = '' } = item
    Object.assign(form, { [key]: initValue })
  })
}

// 暴露“重置”方法
defineExpose({ reset })

const getComponent = (value) => {
  if (typeof value === 'string') {
    return resolveComponent(value)
  }
  return value
}

// 初始化表单响应式对象
reset()

watch(form, (newVal) => {
  const data = toRaw(newVal)
  emit('formDataCast', { ...data })
}, {
  immediate: true
})

</script>
<script>
export default {
  name: 'StructuredForm',
}
</script>
<style>
.structured-el-form {
  .el-form-item__label {
    align-items: center;

    span[class^=icon-] {
      margin-left: 4px;
    }
  }
}
</style>
