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
      <el-form-item label="水平对齐方式">
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
      <el-form-item label="字体名称">
        <el-select
          v-model="fontFamily"
          placeholder="请选择"
          @change="fontFamilyChange"
        >
          <el-option
            v-for="item in fontFamilyList"
            :key="item.en"
            :label="`${item.ch}(${item.en})`"
            :value="item.en"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref, inject } from 'vue'
import { fontFamilyList } from './config'
const shape = inject('currentShape')
const [instanceText] = shape.value
const layerList = inject('layerList')
const textContent = ref(instanceText.attrs.text)
const colorValue = ref(instanceText.attrs.fill)
const fontSize = ref(instanceText.attrs.fontSize)
const fontFamily = ref(instanceText.attrs.fontFamily)

// 输入框input事件
const input = (value) => {
  const { id } = instanceText.attrs
  const [currentShapeRow] = layerList.filter((item) => item.attrs.id === id)
  if (currentShapeRow) {
    Object.assign(currentShapeRow.attrs, { text: value })
  }
}
// 文本对齐方式
const setTextAlign = (align) => {
  const [instanceText] = shape.value
  const [currentShapeRow] = layerList.filter(
    (item) => item.attrs.id === instanceText.attrs.id
  )
  if (currentShapeRow) {
    Object.assign(currentShapeRow.attrs, { align })
  }
}

// 颜色改变事件
const colorChange = (value) => {
  const { id } = instanceText.attrs
  const [currentShapeRow] = layerList.filter((item) => item.attrs.id === id)
  if (currentShapeRow) {
    Object.assign(currentShapeRow.attrs, { fill: value })
  }
}
// 字体大小改变事件
const fontSizeChange = (value) => {
  const { id } = instanceText.attrs
  const [currentShapeRow] = layerList.filter((item) => item.attrs.id === id)
  if (currentShapeRow) {
    Object.assign(currentShapeRow.attrs, { fontSize: value })
  }
}
// 字体名称改变事件
const fontFamilyChange = (value) => {
  const { id } = instanceText.attrs
  const [currentShapeRow] = layerList.filter((item) => item.attrs.id === id)
  if (currentShapeRow) {
    Object.assign(currentShapeRow.attrs, { fontFamily: value })
  }
}
</script>
<script>
export default {
  name: 'TextToolBar'
}
</script>
