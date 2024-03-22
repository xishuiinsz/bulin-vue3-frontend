<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 客户表格 </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-form :inline="true">
          <el-form-item label="用户名">
            <el-input
              v-model="query.name"
              placeholder="请输入用户名"
              class="handle-input mr10"
            ></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input
              v-model="query.address"
              placeholder="请输入地址"
              class="handle-input mr10"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button-group>
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="handleReset"
                >重置</el-button
              >
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="handleSearch"
                >搜索</el-button
              >
            </el-button-group>
          </el-form-item>
        </el-form>
      </div>
      <div
        class="el-table-container"
        @click="tableClick"
      >
        <el-table
          table-layout="auto"
          :data="tableData"
          border
          class="table"
          ref="customerTable"
          header-cell-class-name="table-header"
        >
          <el-table-column
            prop="customerId"
            label="客户编号"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="fullName"
            label="客户代表"
          >
            <template #default="{ row }">{{ row.firstName }} {{ row.lastName }}</template>
          </el-table-column>
          <el-table-column
            prop="company"
            label="客户公司"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="客户地址"
          >
          </el-table-column>
          <el-table-column
            prop="city"
            label="城市"
          >
          </el-table-column>
          <el-table-column
            prop="state"
            label="省|州"
          >
          </el-table-column>
          <el-table-column
            prop="country"
            label="国家"
          >
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮件"
          >
          </el-table-column>
          <el-table-column
            v-if="tableData.length"
            label="操作"
            width="180"
            align="center"
          >
            <template #default="scope">
              <el-button
                :text="true"
                icon="el-icon-edit"
                @click="handleEdit(scope.row)"
                >编辑
              </el-button>
              <el-button
                :text="true"
                icon="el-icon-delete"
                class="red"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog
      title="编辑"
      v-model="editVisible"
      width="30%"
    >
      <el-form label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
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
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="saveEdit"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import { ref, reactive, onMounted, readonly, toRaw } from 'vue';
  import { ElMessage, ElMessageBox, ElLoading } from 'element-plus';
  import { fetchCustomerData, updateCustomerData, deleteCustomerData } from '@i';

  export default {
    name: 'CustomerTable',
    setup() {
      const query = reactive({
        address: '',
        name: '',
        pageIndex: 1,
        pageSize: 10,
      });
      const tableData = ref([]);
      const pageTotal = ref(0);
      // 获取表格数据
      const getData = () => {
        fetchCustomerData(query).then((res) => {
          tableData.value = res?.list || [];
          pageTotal.value = res?.pageTotal ?? 0;
        });
      };

      // 重置操作
      const handleReset = () => {
        Object.assign(query, {
          address: '',
          name: '',
          pageIndex: 1,
          pageSize: 10,
        });
        handleSearch();
      };
      // 查询操作
      const handleSearch = () => {
        query.pageIndex = 1;
        getData();
      };
      // 分页导航
      const handlePageChange = (val) => {
        query.pageIndex = val;
        getData();
      };

      // 删除操作
      const handleDelete = (row) => {
        // 二次确认删除
        ElMessageBox.confirm('确定要删除吗？', '提示', {
          type: 'warning',
        })
          .then(async (status) => {
            if (status === 'confirm') {
              const loadingInstance = ElLoading.service();
              const resp = await deleteCustomerData({
                customerId: row.customerId,
              });
              loadingInstance.close();
              if (resp && resp.code === '0') {
                ElMessage.success(resp.msg || '删除成功');
                handleSearch();
              } else {
                ElMessage.error(resp.msg || '删除失败');
              }
            }
          })
          .catch((err) => {
            console.error(err.message);
          });
      };

      // 表格编辑时弹窗和保存
      const editVisible = ref(false);
      const form = reactive({
        name: '',
        address: '',
      });

      // 点击[编辑]事件
      const handleEdit = (row) => {
        Object.assign(form, row, {
          name: row.firstName + ' ' + row.lastName,
        });
        editVisible.value = true;
      };
      // 编辑提交事件
      const saveEdit = async () => {
        const parmas = toRaw(form);
        const [firstName, lastName] = parmas.name.split(' ');
        Object.assign(parmas, {
          firstName,
          lastName,
        });
        const loadingInstance = ElLoading.service();
        const resp = await updateCustomerData(readonly(parmas));
        loadingInstance.close();
        if (resp && resp.code === '0') {
          editVisible.value = false;
          ElMessage.success((resp && resp.msg) || '操作成功');
          handleSearch();
        } else {
          ElMessage.error((resp && resp.msg) || '操作失败');
        }
      };
      onMounted(() => {
        getData();
      });
      const tableClick = () => {
        console.log('tableClick');
      };
      return {
        query,
        tableData,
        pageTotal,
        editVisible,
        form,
        handleReset,
        handleSearch,
        handlePageChange,
        handleDelete,
        handleEdit,
        saveEdit,
        tableClick,
      };
    },
  };
</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }

  .table {
    width: 100%;
    font-size: 14px;
  }

  .red {
    color: #ff0000;
  }

  .mr10 {
    margin-right: 10px;
  }

  .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
  }
</style>
