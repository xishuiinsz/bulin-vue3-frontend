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
          <el-button @click="addTextHanler('文字')" type="primary"
            >文字</el-button
          >
          <el-button @click="addCircleHanler('圆形')" type="primary"
            >圆形</el-button
          >
          <el-button @click="addRectHanler('矩形')" type="primary"
            >矩形</el-button
          >
          <el-button @click="addImageHanler('图片')" type="primary"
            >图片</el-button
          >
        </el-button-group>
      </el-form-item>
    </el-form>
    <el-dialog
      v-model="dialogVisibleAddElement"
      :title="dialogOption.title"
      width="30%"
    >
      <component @formChange="formChange" :is="dialogOption.component" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelAddElement">Cancel</el-button>
          <el-button @click="confirmAddElement" type="primary">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, inject } from 'vue'
import newElementText from './components/newElementText.vue'
import newElementCircle from './components/newElementCircle.vue'
import newElementRect from './components/newElementRect.vue'
import newElementImage from './components/newElementImage.vue'
import { getMaxId } from './utils'
let formData
const shape = inject('currentShape')
const layerList = inject('layerList')
const shapeSize = inject('configKonva')
const dialogVisibleAddElement = ref(false)
const dialogOption = {
  title: '新增元素',
  type: '',
  component: null
}

const stageExport = () => {
  console.log(shape.value)
}
const shageSizeChange = (size) => {
  console.log(size)
}

// 新增 Text 元素
const addTextHanler = (text) => {
  dialogOption.title += ` - ${text}`
  Object.assign(dialogOption, {
    elementType: 'Text',
    component: newElementText
  })
  dialogVisibleAddElement.value = true
}

// 新增 Circle 元素
const addCircleHanler = (text) => {
  dialogOption.title += ` - ${text}`
  Object.assign(dialogOption, {
    elementType: 'Circle',
    component: newElementCircle
  })
  dialogVisibleAddElement.value = true
}
// 新增 Rect元素
const addRectHanler = (text) => {
  dialogOption.title += ` - ${text}`
  Object.assign(dialogOption, {
    elementType: 'Rect',
    component: newElementRect
  })
  dialogVisibleAddElement.value = true
}
// 新增 Image元素
const addImageHanler = (text) => {
  dialogOption.title += ` - ${text}`
  Object.assign(dialogOption, {
    elementType: 'Image',
    component: newElementImage
  })
  dialogVisibleAddElement.value = true
}

// 取消 新增元素
const cancelAddElement = () => {
  dialogOption.title = '新增元素'
  dialogVisibleAddElement.value = false
}

// 确认 新增元素
const confirmAddElement = () => {
  dialogOption.title = '新增元素'
  dialogVisibleAddElement.value = false
  const maxId = getMaxId(layerList)
  layerList.push({
    type: dialogOption.elementType,
    attrs: Object.assign(
      { id: '' + (parseInt(maxId, 10) + 1), draggable: true },
      formData
    )
  })
}

// 表单改变事件
const formChange = (list) => {
  formData = list
}
</script>
