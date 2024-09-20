<template>
  <div @click="clickEvt" v-if="showSimulator" class="el-input input-simulator">
    <div class="el-input__wrapper">
      <div class="el-input__inner">
        {{ myValue }}
      </div>
    </div>
  </div>
  <el-input @vue:mounted="inputMountedEvt" @focus="focusEvt" v-model="myValue" v-else />
</template>
<script setup>
import { ref } from 'vue';
defineOptions({
  name: 'InputSimulator',
});
const showSimulator = ref(true);
const myValue = defineModel();

const clickEvt = () => {
  showSimulator.value = false;
};

const focusEvt = (event) => {
  const input = event.target;
  const blurEvt = () => {
    showSimulator.value = true;
  };
  input?.addEventListener('blur', blurEvt);
};

const inputMountedEvt = (event) => {
  const input = event.el.querySelector('input');
  input?.focus();
};
</script>
<style lang="scss" scoped>
.el-input {
  &.input-simulator {
    width: 100%;
    .el-input__wrapper {
      width: 100%;
      .el-input__inner {
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
}
</style>
