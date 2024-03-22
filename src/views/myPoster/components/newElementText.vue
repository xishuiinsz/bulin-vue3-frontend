<template>
  <div class="element-common-container element-image-container">
    <el-form label-width="120px">
      <el-form-item label="宽度">
        <el-input-number :min="10" v-model="fontOption.width" />
      </el-form-item>
      <el-form-item label="高度">
        <el-input-number :min="10" v-model="fontOption.height" />
      </el-form-item>
      <el-form-item label="x轴距离">
        <el-input-number v-model="fontOption.x" />
      </el-form-item>
      <el-form-item label="y轴距离">
        <el-input-number v-model="fontOption.y" />
      </el-form-item>
      <el-form-item label="文本内容">
        <el-input v-model="fontOption.text" />
      </el-form-item>
      <el-form-item label="字号">
        <el-input-number v-model="fontOption.fontSize" />
      </el-form-item>
      <el-form-item label="填充色">
        <el-color-picker v-model="fontOption.fill" />
      </el-form-item>
      <el-form-item label="字体族">
        <el-select v-model="fontOption.fontFamily">
          <el-option v-for="subitem in transferedFontFamilyList" :key="subitem.value" :label="subitem.label"
            :value="subitem.value" />
        </el-select>
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
import { reactive, toRaw } from 'vue'
import { fontFamilyList } from '../config'
import { addLayerByTail } from '../hooks/useLayerList'
const emit = defineEmits(['closeElementDialog'])

// 字体列表格式化
const transferedFontFamilyList = fontFamilyList.map((item) => {
  return {
    value: item.en,
    label: `${item.ch}(${item.en})`
  }
})

// 字体响应式模型数据
const fontOption = reactive({
  width: 200,
  height: 200,
  x: 200,
  y: 200,
  text: '编辑内容',
  fontSize: 14,
  fill: '#303133',
  fontFamily: 'SimSun'

})
// 取消 新增元素
const cancelAddElement = () => {
  emit('closeElementDialog')
}

// 确认 新增元素
const confirmAddElement = () => {
  addLayerByTail('Text', toRaw(fontOption))
  emit('closeElementDialog')
}
</script>
<script>
export default {
  name: 'NewElementText'
}
</script>
