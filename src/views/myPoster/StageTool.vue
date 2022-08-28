<template>
    <div class="stage-tool-container">
        <h4>画布设置</h4>
        <el-button-group>
            <el-button @click="stageExport" type="primary">导出</el-button>
        </el-button-group>
    </div>
</template>
<script setup>
import { inject } from 'vue';
const shape = inject('currentShape')
const stageExport = () => {
    console.log(shape.value);
}
</script>