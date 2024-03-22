<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 基础表格 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input @input="queryByName('test', 'test1')" v-model="query.name" placeholder="用户名"
                    class="handle-input mr10"></el-input>
                <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
            </div>
            <structuredTable class="my-table" :tableColumnList="tableColumnList"
                :tableOptions="{ data: tableDataList }" />
            <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                    :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" v-model="editVisible" width="30%">
            <el-form label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, h, computed } from 'vue';
import { ElButton } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import { fetchData } from '@i/index';
import { myDebounced } from '@/utils';
import structuredTable from '@c/structuredTable/entry.jsx';
import { tableColumnList, tableDataList } from './tableData.js';

const query = reactive({
    address: '',
    name: '',
    pageIndex: 1,
    pageSize: 10,
});
const pageTotal = computed(() => tableDataList.length);
// 获取表格数据
const getData = () => {
    fetchData(query).then((res) => {
        tableDataList.value = res.list;
        pageTotal.value = res.pageTotal || 50;
    });
};
// getData()

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

// 表格编辑时弹窗和保存
const editVisible = ref(false);
const form = reactive({
    id: '',
    name: '',
    address: '',
});
const saveEdit = () => {
    editVisible.value = false;
    const { id } = form;
    const [editRow] = tableDataList.filter((item) => item.id === id);
    editRow && Object.assign(editRow, form);
};

</script>

<script>
export default {
    name: 'BasetableDemo',
};
</script>

<style lang="scss" scoped>
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

:deep(.table-td-thumb) {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
