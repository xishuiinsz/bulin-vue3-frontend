<template>
  <div class="stage-tool-container">
    <h4>画布设置</h4>
    <el-button-group>
      <el-button @click="stageExport" type="primary">导出</el-button>
    </el-button-group>
    <el-form label-position="top" label-width="80px">
      <el-form-item label="画布尺寸">
        <el-input-number
          style="width: 80px"
          :controls="false"
          v-model="shapeSize.width"
          :min="1"
          :max="1000"
          @change="shageSizeChange('width')"
        />
        *
        <el-input-number
          style="width: 80px"
          :controls="false"
          v-model="shapeSize.height"
          :min="1"
          :max="2000"
          @change="shageSizeChange('height')"
        />
      </el-form-item>
      <el-form-item label="新增元素">
        <el-button-group>
          <el-button @click="addTextHanler" type="primary">文字</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <el-dialog v-model="dialogVisibleAddElement" title="新增元素" width="30%">
      <myForm :formList="formList"></myForm>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelAddElement">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, inject } from 'vue'
import myForm from './components/myForm.vue'
const shape = inject('currentShape')
const shapeSize = inject('configKonva')
const dialogVisibleAddElement = ref(false)

const formList = [
  {
    key: 'width',
    label: '宽度',
    name: 'ElInput',
    attrs: {
      modelValue: 200
    }
  },
  {
    key: 'height',
    label: '高度',
    name: 'ElSelect',
    attrs: {
      modelValue: '300'
    }
  }
]
const stageExport = () => {
  console.log(shape.value)
}
const shageSizeChange = (size) => {
  console.log(size)
}
const addType = {
  value: ''
}
const addTextHanler = () => {
  Object.assign(addType, { value: 'text' })
  dialogVisibleAddElement.value = true
}

const cancelAddElement = () => {
  dialogVisibleAddElement.value = false
}
</script>
