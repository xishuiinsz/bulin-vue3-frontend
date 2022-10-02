<template>
  <myForm @formChange="formChange" :formList="formList"></myForm>
</template>
<script setup>
import myForm from './myForm.vue'
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
  console.log(list)
  console.log(key)
}
</script>
<script>
export default {
  name: 'NewElementText'
}
</script>
