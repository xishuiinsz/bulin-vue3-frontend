<template>
  <div class="my-tootip el-card box-card">
    <div class="el-card__header">
      <div class="clearfix">
        <span>你好，{{ name }}</span>
      </div>
    </div>
    <div class="el-card__body">
      <div v-for="item in list" class="text item">
        <span class="series-name">
          <i :style="{ color: item.color }" class="el-icon-lx-home"></i>{{ item.seriesName }}
        </span>
        <span class="series-value">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
const [series] = props.list
const { name } = series
</script>
<style scoped lang="scss">
.my-tootip.el-card.box-card {
  width: 120px;

  .el-card__header {
    padding: 4px 8px;
  }

  .el-card__body {
    width: 100%;
    list-style: none;
    padding: 8px;
    box-sizing: border-box;

    .text.item {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .series-name {
        .el-icon-lx-home {
          margin-right: 4px;
        }
      }
    }
  }
}
</style>
