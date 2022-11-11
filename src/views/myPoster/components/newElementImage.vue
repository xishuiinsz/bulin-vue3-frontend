<template>
  <div class="element-common-container element-image-container">
    <el-form label-width="120px">
      <el-form-item label="宽度">
        <el-input-number :disabled="flagWidthAuto" :min="1" v-model="imageOption.width" />
        <el-checkbox style="margin-left:8px;" @change="AutoCheckChange('width')" v-model="flagWidthAuto" label="自动" />
      </el-form-item>
      <el-form-item label="高度">
        <el-input-number :min="1" :disabled="flagHeightAuto" v-model="imageOption.height" />
        <el-checkbox style="margin-left:8px;" @change="AutoCheckChange('height')" v-model="flagHeightAuto" label="自动" />
      </el-form-item>
      <el-form-item label="x轴距离">
        <el-input-number v-model="imageOption.x" />
      </el-form-item>
      <el-form-item label="y轴距离">
        <el-input-number v-model="imageOption.y" />
      </el-form-item>
      <el-form-item label="描边粗细">
        <el-input-number v-model="imageOption.strokWidth" />
      </el-form-item>
      <el-form-item v-if="imageOption.strokWidth" label="描边色">
        <el-color-picker v-model="imageOption.stroke"></el-color-picker>
      </el-form-item>
      <el-form-item label="上传图片">
        <el-upload :ref="(el) => Object.assign(imageRawOption, { ref: el })" class="bg-image-upload" action="#"
          :multiple="false" :http-request="handleUpload" :on-remove="handleRemoveFile" :limit="1">
          <el-button @click="beginUploadImage" type="primary">点我上传</el-button>
          <template #tip>
            <div class="el-upload__tip">如上传无反应，请清空下面文件列表！</div>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>
    <div class="footer">
      <span class="dialog-footer">
        <el-button @click="cancelAddElement">Cancel</el-button>
        <el-button @click="confirmAddElement" type="primary">确认</el-button>
      </span>
    </div>
  </div>

</template>
<script setup>
import { ref, reactive, toRaw } from 'vue'
import axios from 'axios'
import { addLayerByTail } from '../hooks/useLayerList'
import { ElMessage } from 'element-plus'
const imageRawOption = {}
const emit = defineEmits(['formChange', 'closeElementDialog'])
// 图片响应式数据
const imageOption = reactive({
  width: 150,
  height: 150,
  x: 100,
  y: 100,
  strokWidth: 0,
  stroke: '#fff',
  imageUrl: '',
  image: null
})

// 宽度自动
const flagWidthAuto = ref(false)
// 高度自动
const flagHeightAuto = ref(false)
const AutoCheckChange = field => {
  if (imageOption.image && imageOption.image instanceof window.Image) {
    imageOption[field] = imageOption.image[field]
  }
}

// 重新上传即清除上一次上传数据
const beginUploadImage = () => {
  imageRawOption.ref.clearFiles()
  imageOption.image = null
}

// 文件上传
const jwt = 'sdfasdfasdfasdfsdfsfdasfd'
const fileMap = new WeakMap()
const handleUpload = async (item) => {
  const formData = new window.FormData()
  formData.append('file', item.file, item.file.name)
  axios
    .post('/api/upload', formData, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    .then((response) => {
      const { uuid, name } = response.data
      const url = `/api/uploads/${uuid}/${name}`
      imageOption.imageUrl = url
      const image = new Image()
      image.onload = () => {
        imageOption.image = image
      }
      image.src = url
    })
}

// 文件 删除回调
const handleRemoveFile = (file) => {
  const fileInfo = fileMap.get(toRaw(file).raw)
  axios
    .delete('http://localhost:1337/api/upload/files/' + fileInfo.id, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    .then((response) => {
      if (response.status === 200 && response.statusText === 'OK') {
        ElMessage.success({
          message: '删除成功!'
        })
      }
    })
}

// 取消 新增元素
const cancelAddElement = () => {
  emit('closeElementDialog')
}

// 确认 新增元素
const confirmAddElement = () => {
  if (!imageOption.image || !(imageOption.image instanceof window.Image)) {
    ElMessage.error({
      message: '请上传图片或等待图片加载完成！'
    })
    return
  }
  addLayerByTail('Image', imageOption)
  emit('closeElementDialog')
}

</script>
<script>
export default {
  name: 'ElementImage'
}
</script>
<style lang="scss" scoped>
.element-image-container {}
</style>
