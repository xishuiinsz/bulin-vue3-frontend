<template>
  <myForm @formChange="formChange" :formList="formList"></myForm>
</template>
<script setup>
import { onMounted, toRaw } from 'vue'
import myForm from './myForm.vue'
const emit = defineEmits(['formChange'])
const formList = [
  {
    key: 'radius',
    label: '半径',
    name: 'ElInputNumber',
    attrs: {
      initValue: 100
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
    key: 'strokeWidth',
    label: '描边粗细',
    name: 'ElInputNumber',
    attrs: {
      initValue: 2
    }
  },
  {
    key: 'stroke',
    label: '描边颜色',
    name: 'ElColorPicke',
    attrs: {
      initValue: '#202aa300'
    }
  },
  {
    key: 'fill',
    label: '填充色',
    name: 'ElColorPicke',
    attrs: {
      initValue: '#fff'
    }
  }
  // {
  //   key: 'height',
  //   label: '高度',
  //   name: 'ElSelect',
  //   options: [
  //     {
  //       value: 'Option1',
  //       label: 'Option1'
  //     },
  //     {
  //       value: 'Option2',
  //       label: 'Option2'
  //     },
  //     {
  //       value: 'Option3',
  //       label: 'Option3'
  //     },
  //     {
  //       value: 'Option4',
  //       label: 'Option4'
  //     },
  //     {
  //       value: 'Option5',
  //       label: 'Option5'
  //     }
  //   ],
  //   attrs: {
  //     initValue: '300'
  //   }
  // }
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
  name: 'NewElementCircle'
}
</script>
