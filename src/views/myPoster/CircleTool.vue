<template>
  <div class="circle-tool-container">
    <h4>圆形</h4>
    <el-form label-position="top" label-width="80px">
      <el-form-item label="填充色">
        <el-color-picker
          v-model="colorFill"
          @change="colorFillChange"
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="描边粗细">
        <el-input-number
          v-model="strokeWidth"
          :min="1"
          :max="1000"
          @change="strokeWidthChange"
        />
      </el-form-item>
      <el-form-item label="描边色">
        <el-color-picker
          v-model="strokeColor"
          @change="strokeColorChange"
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="半径大小">
        <el-input-number
          v-model="radiusValue"
          :min="1"
          :max="1000"
          @change="radiusValueChange"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref, inject } from 'vue'
const shape = inject('currentShape')
const [instanceText] = shape.value
const layerList = inject('layerList')

// 填充色
const colorFill = ref(instanceText.attrs.fill)
// 填充色change
const colorFillChange = (color) => {
  const { id } = instanceText.attrs
  const [currentShapeRow] = layerList.filter((item) => item.attrs.id === id)
  currentShapeRow && Object.assign(currentShapeRow.attrs, { fill: color })
}
// 描边
const strokeWidth = ref(instanceText.attrs.strokeWidth)
// 描边粗细change
const strokeWidthChange = (value) => {
  const { id } = instanceText.attrs
  const [currentShapeRow] = layerList.filter((item) => item.attrs.id === id)
  currentShapeRow &&
    Object.assign(currentShapeRow.attrs, { strokeWidth: value })
}

// 描边色
const strokeColor = ref(instanceText.attrs.stroke || '#fff')
// 描边色change
const strokeColorChange = (value) => {
  const { id } = instanceText.attrs
  const [currentShapeRow] = layerList.filter((item) => item.attrs.id === id)
  currentShapeRow && Object.assign(currentShapeRow.attrs, { stroke: value })
}

// 半径
const radiusValue = ref(instanceText.attrs.radius)
// 半径大小change
const radiusValueChange = (value) => {
  const { id } = instanceText.attrs
  const [currentShapeRow] = layerList.filter((item) => item.attrs.id === id)
  currentShapeRow && Object.assign(currentShapeRow.attrs, { radius: value })
}
</script>
<script>
export default {
  name: 'CircleToolBar'
}
</script>
