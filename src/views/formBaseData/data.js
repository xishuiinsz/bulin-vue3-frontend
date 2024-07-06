import { ref } from 'vue';
import activityTime from './activityTime.vue';
import { reactive } from 'vue';

// 收集表单数据
export const formData = {};

const getFormItemByKey = (list, key) => {
  const formItem = list.find((item) => item.key === key);
  if (formItem) {
    return formItem;
  }
  return {};
};

const formList = [
  {
    key: 'name',
    initValue: '',
    type: 'ElInput',
    formItemProps: {
      label: '活动名称',
      required: true,
      rules: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
    },
    componentProps: {
      placeholder: '请输入活动名称',
    },
  },
  {
    key: 'region',
    initValue: 'wuchang',
    type: 'ElxSelect',
    formItemProps: {
      label: '活动区域',
    },
    componentProps: {
      placeholder: '请输入活动区域',
      options: [
        { value: 'wuchang', label: '武昌' },
        { value: 'donghu', label: '东湖高新' },
      ],
    },
  },
  {
    key: 'city',
    initValue: '武汉',
    type: 'chinaCitiesPicker',
    formItemProps: {
      label: '活动城市',
    },
    componentProps: {
      placeholder: '请输入活动城市',
    },
  },
  {
    key: 'time',
    initValue: ['2024-02-08', '22:30:18'],
    type: activityTime,
    formItemProps: { label: '活动时间' },
    componentProps: {},
  },
  { key: 'delivery', initValue: true, type: 'ElSwitch', formItemProps: { label: '即时配送' }, componentProps: {} },
  {
    key: 'type',
    initValue: ['Promotion activities'],
    type: 'ElxCheckboxGroup',
    formItemProps: {
      label: '活动性质',
    },
    componentProps: {
      placeholder: '请输入活动性质',
      options: [
        { value: '1', label: 'Online activities' },
        { value: '2', label: 'Promotion activities' },
        { value: '3', label: 'Offline activities' },
        { value: '4', label: 'Simple brand exposure' },
      ],
    },
  },
  {
    key: 'resource',
    type: 'ElxRadioGroup',
    formItemProps: { label: '特殊资源' },
    initValue: '2',
    componentProps: {
      onChange: (value, reactiveFormData) => {
        const descFormItem = getFormItemByKey(formList, 'desc');
        descFormItem && Object.assign(descFormItem.formItemProps, { hidden: value === '2' });
        if (value === '2') {
          Object.assign(reactiveFormData, { desc: '' });
        }
      },
      options: [
        { value: '1', label: 'Sponsor' },
        { value: '2', label: 'Venue' },
      ],
    },
  },
  {
    key: 'desc',
    type: 'ElInput',
    formItemProps: reactive({ label: '活动描述', hidden: true }),
    componentProps: { type: 'textarea', placeholder: '请输入活动描述' },
  },
  {
    key: 'isFree',
    initValue: false,
    type: 'ElSwitch',
    formItemProps: { label: '是否公益' },
    componentProps: {
      onChange: (value, reactiveFormData) => {
        if (value === true) {
          reactiveFormData.cost = '0.00';
        } else {
          reactiveFormData.cost = '';
        }
        const costFormItem = getFormItemByKey(formList, 'cost');
        costFormItem && Object.assign(costFormItem.componentProps, { disabled: value });
      },
    },
  },
  {
    key: 'cost',
    initValue: '',
    type: 'ElInput',
    formItemProps: { label: '活动经费' },
    componentProps: reactive({
      type: 'number',
      placeholder: '请输入金额',
      disabled: true,
      slots: {
        append: () => '万元',
      },
    }),
  },
];
export default formList;
