import { h, reactive, defineComponent, resolveComponent } from 'vue';

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
  const _tableOptions = { style: { width: '100%' }, 'show-overflow-tooltip': true, ...tableOptions };
  return (
    <el-table {..._tableOptions}>
      {tableColumnList.map((item) => {
        const slots = {};
        if (item.default) {
          Object.assign(slots, { default: (scope) => item.default(scope.row, scope) });
        }
        if (item.header) {
          Object.assign(slots, { header: (scope) => item.header(item) });
        }
        return <el-table-column {...item}>{slots}</el-table-column>;
      })}
    </el-table>
  );
}

structuredTable.render = render;
export default structuredTable;
