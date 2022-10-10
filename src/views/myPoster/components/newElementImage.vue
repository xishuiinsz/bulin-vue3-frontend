<template>
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
      <el-upload :ref="(el)=> Object.assign(imageRawOption, { ref: el})" class="bg-image-upload" action="#"
        :multiple="false" :http-request="handleUpload" :on-remove="handleRemoveFile" :limit="1">
        <el-button @click="beginUploadImage" type="primary">点我上传</el-button>
        <template #tip>
          <div class="el-upload__tip">如上传无反应，请清空下面文件列表！</div>
        </template>
      </el-upload>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive, toRaw, watch } from 'vue'
import axios from 'axios'
import { staticServer, myIdentifier } from '../config'
const imageRawOption = {}
const emit = defineEmits(['formChange'])
// 图片响应式数据
const imageOption = reactive({
  width: 150,
  height: 150,
  x: 100,
  y: 100,
  strokWidth: 0,
  stroke: '#fff',
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
let jwt
const fileMap = new WeakMap()
const handleUpload = async (item) => {
  const { data } = await axios.post(
    `${staticServer}/api/auth/local`,
    myIdentifier
  )
  jwt = data.jwt
  const formData = new window.FormData()
  formData.append('files', item.file, item.file.name)
  axios
    .post(`${staticServer}/api/upload`, formData, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    .then((response) => {
      const [fileInfo] = response.data
      // 上传的文件与上传后后端响应的数据映射起来
      fileMap.set(toRaw(item.file), fileInfo)
      const { url } = fileInfo
      const img = new window.Image()
      img.onload = () => {
        imageOption.image = img
        if (flagWidthAuto.value) {
          imageOption.width = img.width
        }
        if (flagHeightAuto.value) {
          imageOption.height = img.height
        }
      }
      img.src = `${staticServer}${url}`
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

watch(imageOption, () => {
  emit('formChange', toRaw(imageOption))
}, {
  immediate: true
})
</script>
<script>
export default {
  name: 'NewElementRect'
}</script>
