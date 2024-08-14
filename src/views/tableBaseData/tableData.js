import { h, reactive } from 'vue';
import { ElImage, ElButton, ElMessage, ElMessageBox } from 'element-plus';
import { User } from '@element-plus/icons-vue';
import showDialog from '@/imperatives/showDialog.jsx';
import detailsForm from './detailsForm.vue';

// 操作列之“编辑”点击事件
const handleEdit = (row) => {
  let dialogInstance = null;
  const closeEvt = () => {
    dialogInstance?.destroy?.();
  };
  const params = {
    title: '编辑',
    slots: {
      default: () => h(detailsForm, { close: closeEvt, initialFormData: { ...row } }),
    },
  };
  dialogInstance = showDialog(params);
};

// 删除操作
const handleDelete = (row, tableDataList) => {
  // 二次确认删除
  ElMessageBox.confirm('确定要删除吗？', '提示', {
    type: 'warning',
  })
    .then(() => {
      const index = tableDataList.findIndex((item) => item === row);
      ElMessage.success('删除成功');
      tableDataList.splice(index, 1);
    })
    .catch(() => {});
};

const selectionChange = (rows) => {
  console.log('selectionChange rows:', rows);
};
const filterChange = (data) => {
  console.log('filterChange data:', data);
};

export const tableColumnList = [
  { type: 'selection', width: 55 },
  { prop: 'id', label: 'ID', width: 55 },
  {
    prop: 'name',
    label: '用户名',
    header: (row) =>
      h('span', { class: 'd-flex align-items-center' }, [
        row.label,
        h(User, { class: 'ml8', style: { width: '16px', height: '16px' } }),
      ]),
  },
  { prop: 'money', label: '账户余额', sortable: true, default: (row) => `￥${row.money}` },
  {
    prop: 'thumb',
    label: '头像(查看大图)',
    className: 'thumb-column',
    width: 120,
    default: (row) =>
      h(ElImage, { class: 'table-td-thumb', src: row.thumb, 'preview-src-list': [row.thumb], 'preview-teleported': true }),
  },
  { prop: 'address', label: '地址' },
  {
    prop: 'state',
    label: '状态',
    filters: [
      { text: '成功', value: '成功' },
      { text: '失败', value: '失败' },
    ],
  },
  { prop: 'date', label: '注册日期' },
  {
    prop: 'action',
    label: '操作',
    minWidth: '50',
    default: (row) =>
      h('div', { class: 'buttons-wrap' }, [
        h(
          ElButton,
          {
            link: true,
            type: 'primary',
            onClick(event) {
              handleEdit(row);
            },
          },
          () => '编辑',
        ),
        h(
          ElButton,
          {
            link: true,
            type: 'danger',
            onClick(event) {
              handleDelete(row, tableDataList);
            },
          },
          () => '删除',
        ),
      ]),
  },
];

export const tableDataList = reactive([
  {
    id: 1,
    name: '张三',
    money: 123,
    address: '广东省东莞市长安镇',
    state: '成功',
    date: '2019-11-1',
    thumb: 'https://lin-xin.gitee.io/images/post/wms.png',
  },
  {
    id: 2,
    name: '李四',
    money: 456,
    address: '广东省广州市白云区',
    state: '成功',
    date: '2019-10-11',
    thumb: 'https://lin-xin.gitee.io/images/post/node3.png',
  },
  {
    id: 3,
    name: '王五',
    money: 789,
    address: '湖南省长沙市',
    state: '失败',
    date: '2019-11-11',
    thumb: 'https://lin-xin.gitee.io/images/post/parcel.png',
  },
  {
    id: 4,
    name: '赵六',
    money: 1011,
    address: '福建省厦门市鼓浪屿',
    state: '成功',
    date: '2019-10-20',
    thumb: 'https://lin-xin.gitee.io/images/post/notice.png',
  },
]);

export const tableOptions = {
  border: true,
  data: tableDataList,
  onSelectionChange: selectionChange,
  onFilterChange: filterChange,
};
