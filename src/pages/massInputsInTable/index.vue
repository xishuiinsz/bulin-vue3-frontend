<template>
  <div class="mass-inputs-in-table w-100 h-100 d-flex flex-column">
    <div class="crumbs">
      <div class="el-breadcrumb" aria-label="Breadcrumb" role="navigation">
        <span class="el-breadcrumb__item" aria-current="page"></span>
        <span class="el-breadcrumb__inner" role="link">
          <i class="el-icon-lx-warn"></i>
          表格中渲染大量输入框
        </span>
      </div>
    </div>
    <div class="container w-100 h-100 flex-fill">
      <el-table :data="tableData" style="width: 100%" height="450">
        <el-table-column fixed prop="date" label="Date" width="150" />
        <el-table-column prop="name" label="Name" width="120">
          <template #default="scope">
            <InputSimulator v-model="scope.row.name" />
          </template>
        </el-table-column>
        <el-table-column prop="state" label="State" width="120">
          <template #default="scope">
            <InputSimulator v-model="scope.row.state" />
          </template>
        </el-table-column>
        <el-table-column prop="city" label="City" width="300">
          <template #default="scope">
            <InputSimulator v-model="scope.row.city" />
          </template>
        </el-table-column>
        <el-table-column prop="address" label="Address" width="400">
          <template #default="scope">
            <InputSimulator v-model="scope.row.address" />
          </template>
        </el-table-column>
        <el-table-column prop="zip" label="Zip">
          <template #default="scope">
            <InputSimulator v-model="scope.row.zip" />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import InputSimulator from './InputSimulator.vue';
const data = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
];
const tableData = [...structuredClone(data), ...structuredClone(data), ...structuredClone(data)];
const vInputSimulator = {
  mounted() {
    console.log('inputSimulator mounted');
  },
  beforeMount(el, binding) {
    console.log('inputSimulator beforeMount: ', el, binding);
    el.classList.add('v-input-simulator');
  },
};
</script>
<style lang="scss" scoped>
.mass-inputs-in-table {
}
</style>
