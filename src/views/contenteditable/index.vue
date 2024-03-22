<template>
  <div class="content-editable-container">
    <div class="crumbs">
      <div class="el-breadcrumb" aria-label="Breadcrumb" role="navigation"><span class="el-breadcrumb__item"
          aria-current="page"><span class="el-breadcrumb__inner" role="link"><i class="el-icon-lx-warn"></i> 权限测试
          </span><span class="el-breadcrumb__separator" role="presentation">/</span></span></div>
    </div>
    <div class="container">
      <h1>多类型输入模式的Input事件与中文输入</h1>
      <el-form class="multi-editable-form" label-width="160px">
        <el-form-item label="div标签(兼容中文输入)">
          <div ref="refDivTag" contenteditable class="div-content-editable" @input="divInput"></div>
        </el-form-item>
        <el-form-item label="原生Input标签">
          <input style="width: 100%;height: 30px;" @input="nativeInput" type="text" />
        </el-form-item>
        <el-form-item label="El Input组件">
          <el-input @input="elInputEvt" v-model="inputValue" placeholder="Please input" clearable />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const inputValue = ref('');
const refDivTag = ref(null)
const compositionendHandler = (e) => {
  console.log(e.target.innerHTML);
}
/**
 *
 * @param {InputEvent} e
 */
const divInput = (e) => {
  const { isComposing, target } = e
  target.removeEventListener('compositionend', compositionendHandler)
  if (isComposing) {
    target.addEventListener('compositionend', compositionendHandler)
  } else {
    console.log(target.innerHTML);
  }
};
const nativeInput = (e) => {
  console.log('nativeInput', e);
};
const elInputEvt = (e) => {
  console.log('elInput', e);
};

</script>
<style lang="scss" scoped>
.content-editable-container {
  .multi-editable-form {
    width: 400px;
  }

  .div-content-editable {
    width: 100%;
    height: 32px;
    background-color: pink;
  }
}
</style>
