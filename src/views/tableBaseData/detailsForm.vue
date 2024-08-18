<template>
  <el-descriptions border title="用户详情">
    <el-descriptions-item label="用户名">{{ initialFormData.name }}</el-descriptions-item>
    <el-descriptions-item label="账户余额">￥{{ initialFormData.money }}</el-descriptions-item>
    <el-descriptions-item label="注册日期">{{ initialFormData.date }}</el-descriptions-item>
    <el-descriptions-item label="状态">
      <el-tag size="small" :type="mapState.get(initialFormData.state)">{{ initialFormData.state }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="地址">
      {{ initialFormData.address }}
    </el-descriptions-item>
  </el-descriptions>
</template>
<script setup>
const props = defineProps({
  initialFormData: {
    type: Object,
    default: () => ({}),
  },
});
const mapState = new Map([
  ['成功', 'success'],
  ['失败', 'danger'],
]);
</script>
