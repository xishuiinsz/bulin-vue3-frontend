<template>
  <div class="stage-tool-container">
    <h4>画布设置</h4>
    <el-button-group style="margin-top: 10px">
      <el-dropdown trigger="click" @command="pixelRatioChoose">
        <el-button type="primary">
          导出画布
          <i class="el-icon-lx-right"></i>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :command="n" v-for="n in 5"
              >像素比：{{ n }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button @click="resetBg" type="primary">重置背景</el-button>
    </el-button-group>
    <el-form label-position="top" label-width="80px">
      <el-form-item label="画布背景色">
        <el-color-picker
          v-model="backgroundcolorValue"
          @change="backgroundcolorChange"
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="画布背景图片">
        <el-upload
          ref="refElUpload"
          class="bg-image-upload"
          action="https://httpbin.org/post"
          :multiple="false"
          :on-success="onSuccessUpload"
          :limit="1"
        >
          <el-button type="primary">点我上传</el-button>
          <template #tip>
            <div class="el-upload__tip">如上传无反应，请清空下面文件列表！</div>
          </template>
        </el-upload>
      </el-form-item>
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
import { ref, inject, getCurrentInstance } from 'vue'
import newElementText from './components/newElementText.vue'
import newElementCircle from './components/newElementCircle.vue'
import newElementRect from './components/newElementRect.vue'
import newElementImage from './components/newElementImage.vue'
import { getMaxId, downloadURI } from './utils'
import { ElMessage } from 'element-plus'

let formData
const layerList = inject('layerList')
const shapeSize = inject('configKonva')
const dialogVisibleAddElement = ref(false)
const currentInstance = getCurrentInstance()
const dialogOption = {
  title: '新增元素',
  type: '',
  component: null
}

// 画布另存为
const pixelRatioChoose = (value) => {
  // 借助全局app传递数据
  const { globalProperties } = currentInstance.appContext.config
  if (globalProperties.mainKonvaStage) {
    const stage = globalProperties.mainKonvaStage.getStage()
    const dataURL = stage.toDataURL({
      pixelRatio: value
    })
    downloadURI(dataURL, '我的画布.png')
  }
}
const shageSizeChange = (size) => {
  console.log(size)
}

// 画布背景色
const backgroundConfig = inject('backgroundConfig')
const backgroundcolorValue = ref(backgroundConfig.fill)
const backgroundcolorChange = (color) => {
  backgroundConfig.fillPriority = 'fill'
  backgroundConfig.fill = color
}
// 画布背景图片
const onSuccessUpload = (response) => {
  const { file } = response.files
  const img = new window.Image()
  img.onload = () => {
    backgroundConfig.fillPriority = 'pattern'
    backgroundConfig.fillPatternImage = img
  }
  img.src = file
}

// 重置背景
const resetBg = () => {
  backgroundConfig.fill = 'rgb(50, 65, 87)'
  backgroundConfig.fillPatternImage = null
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
  if (dialogOption.elementType === 'Image') {
    if (!formData.image || !formData.image instanceof Image) {
      ElMessage.error({
        message: '请上传图片或等待图片加载完成！'
      })
      return
    }
  }
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
<script>
export default {
  name: 'StageToolBar'
}
</script>
