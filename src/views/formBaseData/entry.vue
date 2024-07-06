<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i>
          表单
        </el-breadcrumb-item>
        <el-breadcrumb-item>基本表单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <structuredForm
          ref="formRef"
          :formOptions="{ inline: false, 'label-width': '130px' }"
          @formDataCast="formDataCastHandler"
          :formItemList="formList"
        >
          <template v-slot="{ formData }">
            <div>
              <el-button @click="onSubmit(formData)" type="primary">提交</el-button>
              <el-button @click="onReset">重置</el-button>
              <el-button>取消</el-button>
            </div>
          </template>
        </structuredForm>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import structuredForm from '@c/structuredForm/entry.jsx';
import formList from './data.js';
const formRef = ref(null);
// 表单数据change回调
const formDataCastHandler = (data) => {};

// 提交
const onSubmit = (data) => {
  console.log('表单数据: ', data);
  formRef.value.validate((flag) => {
    console.log('校验结果: ', flag);
  });
};
// 重置
const onReset = () => {
  formRef?.value?.reset?.();
};
</script>
<script>
export default {
  name: 'StructuredFormDemo',
};
</script>
