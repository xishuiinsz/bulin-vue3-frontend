import { ref } from 'vue';
import activityTime from './activityTime.vue';

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
    label: '活动名称',
    props: {
      placeholder: '请输入活动名称',
    },
  },
  {
    key: 'region',
    initValue: 'wuchang',
    type: 'ElxSelect',
    label: '活动区域',
    props: {
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
    label: '活动城市',
    props: {
      placeholder: '请输入活动城市',
    },
  },
  { key: 'time', initValue: ['2024-02-08', '22:30:18'], type: activityTime, label: '活动时间', props: {} },
  { key: 'delivery', initValue: true, type: 'ElSwitch', label: '即时配送', props: {} },
  {
    key: 'type',
    initValue: ['Promotion activities'],
    type: 'ElxCheckboxGroup',
    label: '活动性质',
    props: {
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
    label: '特殊资源',
    initValue: '2',
    props: {
      onChange: (value, reactiveFormData) => {
        const costFormItem = getFormItemByKey(formList, 'desc');
        costFormItem && Object.assign(costFormItem.hidden, { value: value === '2' });
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
    hidden: ref(true),
    props: { type: 'textarea', placeholder: '请输入活动形式' },
    label: '活动形式',
  },
  {
    key: 'isFree',
    initValue: false,
    type: 'ElSwitch',
    label: '是否公益',
    props: {
      onChange: (value, reactiveFormData) => {
        if (value === true) {
          reactiveFormData.cost = '0.00';
        } else {
          reactiveFormData.cost = '';
        }
        const costFormItem = getFormItemByKey(formList, 'cost');
        costFormItem && Object.assign(costFormItem.props.disabled, { value });
      },
    },
  },
  {
    key: 'cost',
    initValue: '',
    type: 'ElInput',
    label: '活动经费',
    props: {
      type: 'number',
      disabled: ref(false),
      placeholder: '请输入金额',
      slots: {
        append: () => '万元',
      },
    },
  },
];
export default formList;
