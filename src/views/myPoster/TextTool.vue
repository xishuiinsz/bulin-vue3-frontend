<template>
  <div class="text-tool-container">
    <h4>文本设置</h4>
    <el-form label-position="top" label-width="80px">
      <el-form-item label="文本内容">
        <el-input
          v-model="textContent"
          @input="input"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="对齐方式">
        <el-button-group>
          <el-button @click="setTextAlign('left')" type="primary"
            >左对齐</el-button
          >
          <el-button @click="setTextAlign('center')" type="primary"
            >居中</el-button
          >
          <el-button @click="setTextAlign('right')" type="primary"
            >右对齐</el-button
          >
          <el-button @click="setTextAlign('justify')" type="primary"
            >分散对齐</el-button
          >
        </el-button-group>
      </el-form-item>
      <el-form-item label="文本颜色">
        <el-color-picker
          v-model="colorValue"
          @change="colorChange"
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="文本大小">
        <el-input-number
          v-model="fontSize"
          :min="10"
          :max="100"
          @change="fontSizeChange"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref, inject } from 'vue'
import { getShageOptionById } from './utils'
const shape = inject('currentShape')
const layerList = inject('layerList')
const textContent = ref(shape.value.attrs.text)
const colorValue = ref(shape.value.attrs.fill)
const fontSize = ref(shape.value.attrs.fontSize)

// 输入框input事件
const input = (value) => {
  const { id } = shape.value.attrs
  const [currentShapeRow] = layerList.filter((item) => item.attrs.id === id)
  if (currentShapeRow) {
    Object.assign(currentShapeRow.attrs, { text: value })
  }
}
// 文本对齐方式
const setTextAlign = (align) => {
  const { id } = shape.value.attrs
  const currentShapeRow = getShageOptionById(id, layerList)
  if (currentShapeRow) {
    Object.assign(currentShapeRow.attrs, { align })
  }
}

// 颜色改变事件
const colorChange = (value) => {
  const { id } = shape.value.attrs
  const [currentShapeRow] = layerList.filter((item) => item.attrs.id === id)
  if (currentShapeRow) {
    Object.assign(currentShapeRow.attrs, { fill: value })
  }
}
// 字体大小改变事件
const fontSizeChange = (value) => {
  const { id } = shape.value.attrs
  const [currentShapeRow] = layerList.filter((item) => item.attrs.id === id)
  if (currentShapeRow) {
    Object.assign(currentShapeRow.attrs, { fontSize: value })
  }
}
</script>
