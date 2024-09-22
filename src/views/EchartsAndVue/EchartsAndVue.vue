<template>
  <div class="h-100 d-flex flex-column">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-redpacket_fill"></i>
          如何使用vue组件来渲染echarts中的tooltip组件？
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container flex-fill d-flex flex-column">
      <div>
        <div class="plugins-tips">如何使用vue组件来渲染echarts中的tooltip组件？</div>
        <div>
          来自百度的
          <a href="https://echarts.apache.org/examples/zh/editor.html?c=line-marker">折线图示例</a>
        </div>
      </div>
      <div class="flex-fill mt-2" id="line-bar"></div>
    </div>
  </div>
</template>
<script setup>
import echarts, { instanceInterceptor } from '@/echarts';
import { onMounted, createApp } from 'vue';
import { renderToString } from 'vue/server-renderer';
import MyTooltip from './MyTooltip.vue';
const myTooltipFormatter = async (params) => {
  const htmlTemplate = await renderToString(createApp(MyTooltip, { list: params }));
  return htmlTemplate;
};
let echartsIntance;
const option = {
  title: {
    text: 'Temperature Change in the Coming Week',
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'transparent',
    formatter: (params, ticket, callback) => {
      myTooltipFormatter(params).then((result) => {
        callback(ticket, result);
      });
      return '计算中...';
    },
  },
  legend: {},
  toolbox: {
    show: true,
    feature: {
      dataZoom: {
        yAxisIndex: 'none',
      },
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisLabel: {
      fontSize: 14,
    },
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} °C',
      fontSize: 14,
    },
  },
  series: [
    {
      name: 'Highest',
      type: 'line',
      data: [10, 11, 13, 11, 12, 12, 9],
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' },
        ],
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }],
      },
    },
    {
      name: 'Lowest',
      type: 'line',
      data: [1, -2, 2, 5, 3, 2, 0],
      markPoint: {
        data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }],
      },
      markLine: {
        data: [
          { type: 'average', name: 'Avg' },
          [
            {
              symbol: 'none',
              x: '90%',
              yAxis: 'max',
            },
            {
              symbol: 'circle',
              label: {
                position: 'start',
                formatter: 'Max',
              },
              type: 'max',
              name: '最高点',
            },
          ],
        ],
      },
    },
  ],
};

const renderCharts = () => {
  const container = document.querySelector('#line-bar');
  if (!echartsIntance) {
    echartsIntance = instanceInterceptor(echarts.init(container));
  }
  echartsIntance.setOption(option);
};

window.onresize = () => {
  echartsIntance.setOption(option);
};
onMounted(renderCharts);
</script>
<script>
export default {
  name: 'EchartsAndVue',
};
</script>

<style></style>
