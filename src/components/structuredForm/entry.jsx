import { isRef, h, reactive, defineComponent, resolveComponent, watch, toRaw, unref } from 'vue';
import { ElForm, ElFormItem, ElInput, ElSwitch, ElDatePicker } from 'element-plus';
import ElxSelect from './ElxSelect.vue';
import ElxCheckboxGroup from './ElxCheckboxGroup.vue';
import ElxRadioGroup from './ElxRadioGroup.vue';
import chinaCitiesPicker from '@/components/chinaCitiesPicker/chinaCitiesPicker.vue';
const structuredForm = defineComponent({
  name: 'structuredForm',
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElxSelect,
    ElxCheckboxGroup,
    ElxRadioGroup,
    ElSwitch,
    chinaCitiesPicker,
    ElDatePicker,
  },
  props: {
    formOptions: {
      type: Object,
      default: () => {},
    },
    formItemList: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, ctx) {
    // 表单响应式对象
    const formData = reactive({});
    // “重置”逻辑
    const reset = () => {
      props.formItemList.forEach((item) => {
        const { key, initValue = '' } = item;
        Object.assign(formData, { [key]: initValue });
      });
    };

    const exposeOption = { reset };

    const formOptions = { ...props.formOptions };
    const formRef = (el) => {
      Object.assign(exposeOption, unref(el));
    };
    Object.assign(formOptions, { ref: formRef });
    ctx.expose(exposeOption);
    const watchOption = {
      immediate: true,
    };
    if (props.formOptions?.immediate === false) {
      Object.assign(watchOption, { immediate: false });
    }
    watch(
      formData,
      (newVal) => {
        const data = toRaw(newVal);
        ctx.emit('formDataCast', { ...data });
      },
      watchOption,
    );
    reset();
    return { formData, formOptions };
  },
});
function render(ctx, cache, $props, $setup, $data, $options) {
  const { formItemList } = $props;
  const getComponent = (value) => {
    if (typeof value === 'string') {
      return resolveComponent(value);
    }
    return value;
  };
  const inputEvt = (key, value) => {
    Object.assign(ctx.formData, { [key]: value });
  };
  const elFormOptions = { ...ctx.formOptions, model: ctx.formData };
  return (
    <el-form {...elFormOptions}>
      {formItemList.map((item) => {
        const componentOptions = {
          modelValue: ctx.formData[item.key],
          'onUpdate:modelValue': (value) => inputEvt(item.key, value),
          ...item.componentProps,
        };
        if (componentOptions.onChange) {
          const _onChange = componentOptions.onChange;
          Object.assign(componentOptions, {
            onChange: (value) => {
              _onChange(value, ctx.formData);
            },
          });
        }
        const slots = {};
        if (item?.props?.slots) {
          Object.assign(slots, item.componentProps.slots);
        }
        const elformItemProps = { ...item.formItemProps, prop: item.key };
        return <el-form-item {...elformItemProps}>{h(getComponent(item.type), componentOptions, slots)}</el-form-item>;
      })}

      {ctx.$slots?.default && <el-form-item>{ctx.$slots.default()}</el-form-item>}
    </el-form>
  );
}
structuredForm.render = render;
export default structuredForm;
