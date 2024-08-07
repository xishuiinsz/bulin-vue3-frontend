<template>
  <div class="card-style-table-container w-100 h-100 d-flex flex-column">
    <div class="crumbs">
      <div class="el-breadcrumb" aria-label="Breadcrumb" role="navigation">
        <span class="el-breadcrumb__item" aria-current="page"></span>
        <span class="el-breadcrumb__inner" role="link">
          <i class="el-icon-lx-warn"></i>
          卡片化表格
        </span>
      </div>
    </div>
    <div class="container table-container w-100 h-100 flex-fill">
      <el-table class="card-style-table" :data="tableData.slice(0, pageSize)" :max-height="maxHeight" style="width: 100%">
        <el-table-column prop="date" label="Date" width="150" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="state" label="State" width="120" />
        <el-table-column prop="city" label="City" width="150" />
        <el-table-column prop="address" label="Address" width="600" />
        <el-table-column prop="zip" label="Zip" width="150" />
        <el-table-column label="Operations" min-width="150">
          <template #default>
            <el-button link type="primary" size="small" @click="handleClick">Detail</el-button>
            <el-button link type="primary" size="small">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="p-4 justify-content-end"
        background
        :page-sizes="[10, 20, 50, 100, 200, 300, 400]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
        v-model:current-page="currentPage2"
        v-model:page-size="pageSize"
      >
        条/页
      </el-pagination>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { tableData } from './data';
const route = useRoute();
const router = useRouter();
const handleClick = (data) => {};
const currentPage2 = ref(1);
const pageSize = ref(20);
const maxHeight = computed(() => {
  const pageHeaderHeight = '70px';
  return 900;
});
</script>
<style lang="scss" scoped>
.card-style-table {
  .table-container:has(.el-table.el-table--scrollable-y) {
    .el-pagination {
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    }
  }
}
</style>
