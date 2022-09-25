<template>
  <div class="stage-tool-container">
    <h4>画布设置</h4>
    <el-button-group>
      <el-button @click="stageExport" type="primary">导出</el-button>
    </el-button-group>
    <el-form label-position="top" label-width="80px">
      <el-form-item label="画布尺寸">
        <el-input-number
          style="width: 80px"
          :controls="false"
          v-model="shapeSize.width"
          :min="1"
          :max="1000"
          @change="shageSizeChange('width')"
        />
        *
        <el-input-number
          style="width: 80px"
          :controls="false"
          v-model="shapeSize.height"
          :min="1"
          :max="2000"
          @change="shageSizeChange('height')"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { inject } from 'vue'
const shape = inject('currentShape')
const shapeSize = inject('configKonva')
const stageExport = () => {
  console.log(shape.value)
}
const shageSizeChange = (size) => {
  console.log(size)
}
</script>
