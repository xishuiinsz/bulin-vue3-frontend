<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="用户名">
        <el-input v-model="form.fullName"></el-input>
      </el-form-item>
      <el-form-item label="客户公司名">
        <el-input v-model="form.company"></el-input>
      </el-form-item>
      <el-form-item label="客户地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="城市">
        <el-input v-model="form.city"></el-input>
      </el-form-item>
      <el-form-item label="省|州">
        <el-input v-model="form.state"></el-input>
      </el-form-item>
      <el-form-item label="国家">
        <el-input v-model="form.country"></el-input>
      </el-form-item>
      <el-form-item label="邮件">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
    </el-form>
    <div class="dialog-footer text-center">
      <el-button @click="cancelClick">取 消</el-button>
      <el-button type="primary" @click="submitClick">确 定</el-button>
    </div>
  </div>
</template>
<script setup>
import { reactive, toRaw } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';

const props = defineProps({
  formInit: {
    type: Object,
    default: () => {},
  },
  submit: {
    type: Function,
    default: () => {},
  },
  cancel: {
    type: Function,
    default: () => {},
  },
});
const form = reactive({
  ...props.formInit,
  fullName: props.formInit.firstName + ' ' + props.formInit.lastName,
});
const submitClick = () => {
  typeof props.submit === 'function' && props.submit({ ...toRaw(form) });
};
const cancelClick = () => {
  typeof props.cancel === 'function' && props.cancel();
};
</script>
