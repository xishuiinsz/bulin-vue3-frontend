<template>
  <div class="element-common-container element-rect-container">
    <el-form label-width="120px">
      <el-form-item label="宽度">
        <el-input-number :min="10" v-model="rectOption.width" />
      </el-form-item>
      <el-form-item label="高度">
        <el-input-number :min="10" v-model="rectOption.height" />
      </el-form-item>
      <el-form-item label="x轴距离">
        <el-input-number v-model="rectOption.x" />
      </el-form-item>
      <el-form-item label="y轴距离">
        <el-input-number v-model="rectOption.y" />
      </el-form-item>
      <el-form-item label="描边色">
        <el-color-picker v-model="rectOption.stroke" />
      </el-form-item>
      <el-form-item label="填充色">
        <el-color-picker v-model="rectOption.fill" />
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
import { addLayerByTail } from '../hooks/useLayerList'
const emit = defineEmits(['closeElementDialog'])

// 字体响应式模型数据
const rectOption = reactive({
  width: 100,
  height: 100,
  x: 200,
  y: 200,
  strokeWidth: 1,
  stroke: '#000',
  fill: '#ffffff00'

})
// 取消 新增元素
const cancelAddElement = () => {
  emit('closeElementDialog')
}

// 确认 新增元素
const confirmAddElement = () => {
  addLayerByTail('Rect', toRaw(rectOption))
  emit('closeElementDialog')
}
</script>
<script>
export default {
  name: 'NewElementRect'
}
</script>
