// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';

/** 引入柱状图and折线图图表，图表后缀都为 Chart  */
import { BarChart, LineChart } from 'echarts/charts';

// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  ToolboxComponent,
} from 'echarts/components';

// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';

// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
import { isPlainObject } from 'lodash';
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LineChart,
  LegendComponent,
  ToolboxComponent,
]);

const fieldsList = ['fontSize'];

const getExtBackup = (name) => {
  const extBackup = '_backup';
  return `${name}${extBackup}`;
};

export const transforSize = (values) => {
  const scale = 1 * (window.innerWidth / 1920).toFixed(1);
  const temp = (data) => {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (fieldsList.includes(key)) {
        const nameBackup = getExtBackup(key);
        if (!data[nameBackup]) {
          Object.assign(data, { [nameBackup]: value });
        }
        const newValue = data[nameBackup] * scale;
        data[key] = 1 * newValue.toFixed();
      } else if (isPlainObject(value)) {
        temp(value);
      }
    });
  };
  temp(values);
  return values;
};

export const instanceInterceptor = (instance) => {
  const { setOption, ...rest } = instance;
  const setOptionCustom = (data) => {
    return setOption.call(instance, transforSize(data));
  };
  Object.assign(rest, { setOption: setOptionCustom });
  return rest;
};

// 导出
export default echarts;
