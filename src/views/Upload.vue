<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 表单
        </el-breadcrumb-item>
        <el-breadcrumb-item>图片上传</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="content-title">支持拖拽</div>
      <div class="plugins-tips">
        Element UI自带上传组件。 访问地址：
        <a
          href="http://element.eleme.io/#/zh-CN/component/upload"
          target="_blank"
          >Element UI Upload</a
        >
      </div>
      <el-upload
        action="#"
        class="upload-demo"
        :before-upload="beforeUpload"
        :http-request="handleUpload"
        :multiple="false"
        :show-file-list="false"
      >
        <el-icon style="font-size: 100px"><UploadFilled /></el-icon>
      </el-upload>
      <div class="file-list-wrap">
        <ul>
          <li v-for="file in fileList" :key="file.hash">
            <el-tooltip class="box-item" effect="light" placement="top-start">
              <template #content>
                <el-button @click="fileDeleteHandler(file)" type="danger"
                  >删除</el-button
                >
              </template>
              <img :src="`${file.url}`" alt="" srcset="" />
            </el-tooltip>
          </li>
        </ul>
      </div>
      <div class="content-title">支持裁剪</div>
      <div class="plugins-tips">
        vue-cropperjs：一个封装了 cropperjs 的 Vue 组件。 访问地址：
        <a href="https://github.com/Agontuk/vue-cropperjs" target="_blank"
          >vue-cropperjs</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { ElLoading, ElMessage } from 'element-plus'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import defaultSrc from '../assets/img/img.jpg'
import axios from 'axios'
export default {
  name: 'upload',
  components: {
    VueCropper
  },
  setup() {
    const jwt = 'sdfasdfasdfasdfsdfsfdasfd'
    const headers = { 'Content-Type': 'multipart/form-data' }
    const fileList = ref([])
    const imgSrc = ref('')
    const cropImg = ref(defaultSrc)
    const dialogVisible = ref(false)
    const cropper = ref(null)

    const setImage = (e) => {
      const file = e.target.files[0]
      if (!file.type.includes('image/')) {
        return
      }
      const reader = new window.FileReader()
      reader.onload = (event) => {
        dialogVisible.value = true
        imgSrc.value = event.target.result
        cropper.value && cropper.value.replace(event.target.result)
      }
      reader.readAsDataURL(file)
    }

    const cropImage = () => {
      cropImg.value = cropper.value.getCroppedCanvas().toDataURL()
    }

    const cancelCrop = () => {
      dialogVisible.value = false
      cropImg.value = defaultSrc
    }
    const beforeUpload = (file) => {
      if (file.size <= 0) {
        ElMessage.error('上传的文件大小不能为空！')
        return false
      }
      if (!file.type.startsWith('image/')) {
        ElMessage.error('请上传图片文件！')
        return false
      }
      return true
    }
    // 文件上传
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
          fileList.value.push({
            uuid,
            url: `/api/uploads/${uuid}/${name}`
          })
        })
    }

    // 文件删除
    const fileDeleteHandler = (file) => {
      const loadingInstance = ElLoading.service()
      axios
        .delete('/api/upload/' + file.uuid, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
        .then((response) => {
          loadingInstance.close()
          const { code, msg } = response.data
          if (code === '0') {
            const index = fileList.value.findIndex((item) => item === file)
            fileList.value.splice(index, 1)
            ElMessage.success(msg || '删除成功')
          }
        })
    }
    return {
      headers,
      fileList,
      beforeUpload,
      handleUpload,
      fileDeleteHandler,
      cropper,
      imgSrc,
      cropImg,
      dialogVisible,
      setImage,
      cropImage,
      cancelCrop
    }
  }
}
</script>

<style scoped>
.content-title {
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}

.pre-img {
  width: 100px;
  height: 100px;
  background: #f8f8f8;
  border: 1px solid #eee;
  border-radius: 5px;
}

.file-list-wrap ul {
  display: flex;
  row-gap: 12px;
  column-gap: 12px;
  flex-wrap: wrap;
}

.file-list-wrap img {
  display: inline-block;
  width: 200px;
  height: 200px;
}

.crop-demo {
  display: flex;
  align-items: flex-end;
}

.crop-demo-btn {
  position: relative;
  width: 100px;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  margin-left: 30px;
  background-color: #409eff;
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  box-sizing: border-box;
}

.crop-input {
  position: absolute;
  width: 100px;
  height: 40px;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
