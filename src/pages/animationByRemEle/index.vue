<template>
  <div class="animation-by-rem-ele w-100 h-100 d-flex flex-column">
    <div class="crumbs">
      <div class="el-breadcrumb" aria-label="Breadcrumb" role="navigation">
        <span class="el-breadcrumb__item" aria-current="page"></span>
        <span class="el-breadcrumb__inner" role="link">
          <i class="el-icon-lx-warn"></i>
          删除行动画
        </span>
      </div>
    </div>
    <div class="container w-100 h-100 flex-fill">
      <div class="d-flex gap-3">
        <div :data-id="item.customerId" class="card" v-for="item in tableData">
          <div class="card-header d-flex justify-content-between gap-2">
            <span class="text-nowrap">{{ item.company || '依规不展示' }}</span>
            <el-popconfirm @confirm="deleteRow(item)" title="确认要删除这条数据吗？">
              <template #reference>
                <el-button type="danger" size="small" :icon="Delete" circle />
              </template>
            </el-popconfirm>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ item.firstName + ' ' + item.lastName }}</h5>
            <p class="card-text">{{ item.phone }}</p>
            <a :href="`mailto:${item.email}`" class="btn btn-primary">email</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, toRaw, h } from 'vue';
import { fetchCustomerData, deleteCustomerData } from '@i';
import { Delete } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import useAnimateRemove from './useAnimateRemove';
const query = {
  address: '',
  name: '',
  pageIndex: 1,
  pageSize: 10,
};
const tableData = ref([]);
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
  fetchCustomerData(query).then((res) => {
    tableData.value = res?.list || [];
    pageTotal.value = res?.pageTotal ?? 0;
  });
};
const { removeByAnimate } = useAnimateRemove();

const deleteRow = async (row) => {
  const resp = await deleteCustomerData({
    customerId: row.customerId,
  });
  if (resp && resp.code === '0') {
    removeByAnimate(`[data-id="${row.customerId}"]`, getData);
  } else {
    ElMessage.error(resp.msg || '删除失败');
  }
};

onMounted(getData);
</script>
<style lang="scss" scoped>
.animation-by-rem-ele {
}
</style>
