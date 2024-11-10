<template>
  <div class="inner-radius w-100 h-100 d-flex flex-column">
    <div class="crumbs">
      <div class="el-breadcrumb" aria-label="Breadcrumb" role="navigation">
        <span class="el-breadcrumb__item" aria-current="page"></span>
        <span class="el-breadcrumb__inner" role="link">
          <i class="el-icon-lx-warn"></i>
          clip-path
        </span>
      </div>
    </div>
    <div class="container w-100 h-100 flex-fill">
      <div class="inner-radius-container m-auto d-flex w1600 gap-4">
        <card-wrap :data="item" v-for="item in list" :key="item.id" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import cardWrap from './cardWrap.vue';
const route = useRoute();
const router = useRouter();
const list = [
  { id: '1', title: '我是主标题1', num: 3 },
  { id: '2', title: '我是主标题2', num: 2 },
  { id: '3', title: '我是主标题3', num: 1 },
];
/**
 *
 * @param {Array} data
 */
const getListWithColumn = (data) => {
  const total = data.reduce((a, b) => {
    return a + b.num;
  }, 0);

  data.forEach((item) => {
    console.log('item.num: ', item.num);
    if (item.num >= 2) {
      Object.assign(item, { columns: 2 });
    }
  });
  return data;
};
const result = getListWithColumn(list);
console.log('result: ', result);
</script>
<style lang="scss" scoped>
.inner-radius {
}
</style>
