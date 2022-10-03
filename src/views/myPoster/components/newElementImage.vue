<template>
  <myForm @formChange="formChange" :formList="formList"></myForm>
</template>
<script setup>
import { onMounted, toRaw } from 'vue'
import myForm from './myForm.vue'
const emit = defineEmits(['formChange'])
const formList = [
  {
    key: 'width',
    label: '宽度',
    name: 'ElInputNumber',
    attrs: {
      initValue: 150
    }
  },
  {
    key: 'height',
    label: '高度',
    name: 'ElInputNumber',
    attrs: {
      initValue: 150
    }
  },
  {
    key: 'x',
    label: 'X轴距离',
    name: 'ElInputNumber',
    attrs: {
      initValue: 200
    }
  },
  {
    key: 'y',
    label: 'y轴距离',
    name: 'ElInputNumber',
    attrs: {
      initValue: 200
    }
  },
  {
    key: 'image',
    label: '上传图片',
    name: 'ElUpload',
    attrs: {
      initValue: ''
    }
  }
]
const formChange = (list, key) => {
  // 校验字段
  const op = {}
  list.forEach((item) =>
    Object.assign(op, {
      [item.key]: toRaw(item.modelValue)
    })
  )
  emit('formChange', op)
}
onMounted(() => {
  const op = {}
  const data = formList.map((item) => {
    return { [item.key]: item.attrs.initValue }
  })
  data.forEach((item) => Object.assign(op, item))
  emit('formChange', op)
})
</script>
<script>
export default {
  name: 'NewElementRect'
}
</script>
