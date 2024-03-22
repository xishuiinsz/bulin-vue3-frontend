import { ref } from 'vue';

// 收集表单数据
export const formData = {};

const getFormItemByKey = (formData, key) => {
  const formItem = formData.find((item) => item.key === key);
  if (formItem) {
    return formItem;
  }
  return {};
};

const formList = [
  {
    key: 'name',
    initValue: '',
    help: '我是帮助内容',
    type: 'ElInput',
    label: '用户名',
    props: {
      disabled: true,
      placeholder: '请输入用户名',
    },
  },
  {
    key: 'money',
    initValue: '',
    type: 'ElInput',
    label: '账户余额',
    props: {
      type: 'number',
      disabled: ref(false),
      placeholder: '请输入账户余额',
      slots: {
        append: () => '￥',
      },
    },
  },
  {
    key: 'address',
    type: 'ElInput',
    props: { type: 'textarea', placeholder: '请输入地址' },
    label: '地址',
  },
  {
    key: 'state',
    initValue: '1',
    type: 'ElxSelect',
    label: '状态',
    props: {
      placeholder: '请选择状态',
      options: [
        { value: '1', label: '成功' },
        { value: '2', label: '失败' },
      ],
    },
  },
  {
    key: 'date',
    initValue: Date.now(),
    type: 'ElDatePicker',
    label: '注册日期',
    props: {
      placeholder: '请选择注册日期',
    },
  },
];
export default formList;
