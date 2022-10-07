<template>
  <el-form label-width="120px">
    <el-form-item v-for="item in formList" :label="item.label">
      <el-input
        v-if="item.name === 'ElInput'"
        :modelValue="getModelValue(item.key)"
        @input="input(item.key, $event)"
      />
      <el-input-number
        v-if="item.name === 'ElInputNumber'"
        :modelValue="getModelValue(item.key)"
        @change="input(item.key, $event)"
      />
      <el-select
        v-if="item.name === 'ElSelect'"
        :modelValue="getModelValue(item.key)"
        @change="change(item.key, $event)"
      >
        <el-option
          v-for="subitem in item.options"
          :key="subitem.value"
          :label="subitem.label"
          :value="subitem.value"
        />
      </el-select>
      <el-color-picker
        v-if="item.name === 'ElColorPicke'"
        :modelValue="getModelValue(item.key)"
        @change="input(item.key, $event)"
      />
      <el-upload
        v-if="item.name === 'ElUpload'"
        class="bg-image-upload"
        action="#"
        :multiple="false"
        :http-request="handleUpload(item.key)"
        :on-remove="handleRemoveFile"
        :limit="1"
      >
        <el-button type="primary">点我上传</el-button>
        <template #tip>
          <div class="el-upload__tip">如上传无反应，请清空下面文件列表！</div>
        </template>
      </el-upload>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, toRaw } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { staticServer, myIdentifier } from '../config'
const props = defineProps({
  formList: Array
})

const emit = defineEmits(['formChange'])

// 根据props生成自己的响应式数据
const myFormList = reactive(
  props.formList.map((item) => {
    return { modelValue: ref(item.attrs.initValue), key: item.key }
  })
)

// 关于v-model关联值
const getModelValue = (key) => {
  const [row] = myFormList.filter((item) => item.key === key)
  return row.modelValue
}

// 公用input输入事件
const input = (key, value) => {
  const [row] = myFormList.filter((item) => item.key === key)
  row.modelValue = value
  emit('formChange', myFormList, key)
}

// 公用change输入事件
const change = (key, value) => {
  const [row] = myFormList.filter((item) => item.key === key)
  row.modelValue = value
  emit('formChange', myFormList, key)
}

// 文件上传
let jwt
const fileMap = new WeakMap()
const handleUpload = (key) => {
  const [row] = myFormList.filter((item) => item.key === key)
  return async (item) => {
    const { data } = await axios.post(
      `${staticServer}/api/auth/local`,
      myIdentifier
    )
    jwt = data.jwt
    let formData = new FormData()
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
          row.modelValue = img
          emit('formChange', myFormList, key)
        }
        img.src = `${staticServer}${url}`
      })
  }
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
</script>
<script>
export default {
  name: 'MyForm'
}
</script>
