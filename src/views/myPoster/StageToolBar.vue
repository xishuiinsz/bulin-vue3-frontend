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
            <el-dropdown-item :command="n" v-for="n in 5">像素比：{{ n }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button @click="resetBg" type="primary">重置背景</el-button>
    </el-button-group>
    <el-form label-position="top" label-width="80px">
      <el-form-item label="画布背景色">
        <el-color-picker v-model="backgroundcolorValue" @change="backgroundcolorChange"></el-color-picker>
      </el-form-item>
      <el-form-item label="画布边框粗细">
        <el-input-number style="width: 150px" v-model="strokeWidthValue" :min="1" :max="5000"
          @change="strokeWidthChange" />
      </el-form-item>
      <el-form-item label="画布边框色">
        <el-color-picker v-model="strokeColorValue" @change="strokeColorChange"></el-color-picker>
      </el-form-item>
      <el-form-item label="画布背景图片">
        <el-upload class="bg-image-upload" action="#" :multiple="false" :http-request="handleUpload" :limit="1">
          <el-button type="primary">点我上传</el-button>
          <template #tip>
            <div class="el-upload__tip">如上传无反应，请清空下面文件列表！</div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="画布尺寸">
        <el-input-number style="width: 80px" :controls="false" v-model="shapeSize.width" :min="1" :max="5000"
          @change="shageSizeChange('width')" />
        *
        <el-input-number style="width: 80px" :controls="false" v-model="shapeSize.height" :min="1" :max="5000"
          @change="shageSizeChange('height')" />
      </el-form-item>
      <el-form-item label="画布缩放">
        <el-slider @input="scaleRateChange" :min="0.2" :max="10" :step="0.1" v-model="scaleRate" />
      </el-form-item>
      <el-form-item label="新增元素">
        <el-button-group>
          <el-button @click="addTextHanler('文字')" type="primary">文字</el-button>
          <el-button @click="addCircleHanler('圆形')" type="primary">圆形</el-button>
          <el-button @click="addRectHanler('矩形')" type="primary">矩形</el-button>
          <el-button @click="addImageHanler('图片')" type="primary">图片</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <el-dialog v-model="dialogVisibleAddElement" :title="dialogOption.title" :show-close="false" width="30%">
      <component @closeElementDialog="closeElementDialogEvt" :is="dialogOption.component" />
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, inject, toRaw } from 'vue'
import newElementText from './components/newElementText.vue'
import newElementCircle from './components/newElementCircle.vue'
import newElementRect from './components/newElementRect.vue'
import newElementImage from './components/newElementImage.vue'
import { downloadURI } from './utils'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import useScaleRate, { changeScaleRate } from './hooks/useScaleStage'
import { useMyPosterStore } from '@/store/myPoster'
const layerList = inject('layerList')
const shapeSize = inject('configKonva')
const dialogVisibleAddElement = ref(false)
const dialogOption = {
  title: '新增元素',
  type: '',
  component: null
}
const { scaleRate } = useScaleRate()
// 画布另存为
const pixelRatioChoose = (value) => {
  const myPosterStore = useMyPosterStore()
  if (myPosterStore.stageNode) {
    const stage = myPosterStore.stageNode
    const dataURL = stage.toDataURL({
      pixelRatio: value
    })
    downloadURI(dataURL, '我的画布.png')
  }
}
const shageSizeChange = (size) => {
  console.log(size)
}

const scaleRateChange = (value) => {
  const { width, height } = toRaw(shapeSize)
  changeScaleRate(value, width, height)
}

// 画布背景色
const backgroundConfig = inject('backgroundConfig')
const backgroundcolorValue = ref(backgroundConfig.fill)
const strokeColorValue = ref(backgroundConfig.stroke)
const strokeWidthValue = ref(backgroundConfig.strokeWidth)

const backgroundcolorChange = (color) => {
  backgroundConfig.fillPriority = 'fill'
  backgroundConfig.fill = color
}
const strokeColorChange = (color) => {
  backgroundConfig.stroke = color
}
const strokeWidthChange = (value) => {
  backgroundConfig.strokeWidth = value
}
// 画布背景图片
const jwt = 'test'
const handleUpload = async (item) => {
  const formData = new window.FormData()
  formData.append('file', item.file, item.file.name)
  const response = await axios
    .post('/api/upload', formData, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
  const { uuid, name } = response.data
  const url = `/api/uploads/${uuid}/${name}`
  const image = new Image()
  image.onload = () => {
    backgroundConfig.fillPriority = 'pattern'
    backgroundConfig.fillPatternImage = image
  }
  image.src = url
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

// 关闭元素新增|编辑对话框
const closeElementDialogEvt = () => {
  dialogOption.title = '新增元素'
  dialogVisibleAddElement.value = false
}

</script>
<script>
export default {
  name: 'StageToolBar'
}
</script>
<style lang="scss">
.element-common-container {
  .footer {
    text-align: right;
  }
}
</style>
