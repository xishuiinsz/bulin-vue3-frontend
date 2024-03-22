<template>
  <div class="form-box">
    <structuredForm
      ref="formRef"
      :formOptions="{ inline: false, 'label-width': '130px' }"
      @formDataCast="formDataCastHandler"
      :formItemList="formItemList"
    >
      <div>
        <el-button
          @click="onSubmit"
          type="primary"
          >提交</el-button
        >
        <el-button @click="onReset">重置</el-button>
        <el-button @click="onCancel">取消</el-button>
      </div>
    </structuredForm>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { ElButton } from 'element-plus';
  import structuredForm from '@c/structuredForm/entry.jsx';
  import formList, { formData } from './formData.js';
  const props = defineProps({
    close: {
      type: Function,
      default: () => {},
    },
    initialFormData: {
      type: Object,
      default: () => ({}),
    },
  });
  const formItemList = formList.map((item) => {
    const _item = { ...item };
    if (props.initialFormData[item.key]) {
      Object.assign(_item, { initValue: props.initialFormData[item.key] });
    }
    return _item;
  });
  const formRef = ref(null);

  // 表单数据change回调
  const formDataCastHandler = (data) => {
    Object.assign(formData, data);
  };

  // 提交
  const onSubmit = () => {
    console.log('表单数据：', formData);
    onCancel();
  };
  // 重置
  const onReset = () => {
    formRef?.value?.reset?.();
  };

  const onCancel = () => {
    props?.close?.();
  };
</script>

<script>
  export default {
    name: 'detailsFormDemo',
  };
</script>
