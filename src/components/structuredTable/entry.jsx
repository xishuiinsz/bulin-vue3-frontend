import { h, reactive, defineComponent, resolveComponent } from 'vue';
const defaultTableOptions = {
  style: { width: '100%' },
  'show-overflow-tooltip': true,
};
const structuredTable = defineComponent({
  name: 'structuredTable',
  props: {
    tableOptions: {
      type: Object,
      default: () => ({}),
    },
    tableColumnList: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, ctx) {},
});
function render(ctx, cache, $props, $setup, $data, $options) {
  const { tableOptions, tableColumnList } = $props;
  const _tableOptions = { ...defaultTableOptions, ...tableOptions };
  return (
    <el-table {..._tableOptions}>
      {tableColumnList.map((item) => {
        const { header: headerSlot, default: defaultSlot, ...columnProps } = item;
        const slots = {};
        if (defaultSlot) {
          Object.assign(slots, { default: (scope) => defaultSlot(scope.row, scope) });
        }
        if (headerSlot) {
          Object.assign(slots, { header: (scope) => headerSlot(item) });
        }
        return <el-table-column {...columnProps}>{slots}</el-table-column>;
      })}
    </el-table>
  );
}

structuredTable.render = render;
export default structuredTable;
