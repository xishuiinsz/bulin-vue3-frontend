<template>
  <div class="scale-input el-input-number">
    <span @click="decrease" role="button" class="el-input-number__decrease">
      <i class="el-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
          <path fill="currentColor" d="M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64"></path>
        </svg>
      </i>
    </span>
    <div class="el-input">
      <div class="el-input__wrapper" tabindex="-1">
        <input
          class="el-input__inner"
          :step="step"
          max="10"
          min="1"
          type="number"
          autocomplete="off"
          tabindex="0"
          v-model="scale"
          @focus="focus"
        />
      </div>
    </div>
    <span @click="increase" role="button" class="el-input-number__increase">
      <i class="el-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
          <path
            fill="currentColor"
            d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z"
          ></path>
        </svg>
      </i>
    </span>
  </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue';
const emit = defineEmits(['centerizeMap', 'scaleMap']);
const props = defineProps({
  initScale: {
    type: Number,
    default: '',
  },
});
const scale = ref(props.initScale * 100);
const step = 10;
const decrease = () => {
  scale.value -= step;
  emit('scaleMap', scale.value);
};
const increase = () => {
  scale.value += step;
  emit('scaleMap', scale.value);
};

const scaleCenterizeMap = () => {
  emit('centerizeMap', scale.value);
};

const focus = (event) => {
  const { target } = event;
  const blur = () => {
    scaleCenterizeMap();
    target.removeEventListener('blur', blur);
    target.removeEventListener('keydown', enterHit);
  };
  const enterHit = (e) => {
    if (e.key === 'Enter') {
      scaleCenterizeMap();
      target.removeEventListener('blur', blur);
      target.removeEventListener('keydown', enterHit);
    }
  };

  target.addEventListener('keydown', enterHit);
  target.addEventListener('blur', blur);
};

watch(
  () => props.initScale,
  (value) => {
    scale.value = parseInt(value * 100);
  },
);
</script>
<script>
export default {
  name: 'ScaleInput',
};
</script>
<style lang="scss" scoped>
.scale-input {
  display: flex;
  flex-direction: column;
  width: 32px;
  border: 1px solid var(--el-border-color);
  overflow: hidden;
  .el-input-number__decrease,
  .el-input-number__increase,
  .el-input {
    position: static;
  }
  .el-input-number__decrease,
  .el-input-number__increase {
    height: 32px;
    border: none;
  }
  .el-input {
    border-radius: 0;
    .el-input__wrapper {
      padding: 0;
    }
  }
}
</style>
