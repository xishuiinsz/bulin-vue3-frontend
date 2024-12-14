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
      <div class="plugins-tips">如何使用vue组件来渲染echarts中的tooltip组件？</div>
      <div class="d-flex flex-fill mt-2 flex-column gap-3">
        <div class="flex-fill d-flex gap-3 flex-basis-0">
          <div class="border border-success flex-fill flex-basis-0 rounded-2 overflow-hidden">
            <LineChartComp :options="lineChartOptions" class="line-chart-comp-wrapper" />
          </div>
          <div class="border border-success flex flex-fill flex-basis-0">
            <bar-chart-comp class="bar-chart-comp-wrapper" />
          </div>
        </div>
        <div class="flex-fill flex-basis-0 d-flex gap-3">
          <div class="border border-danger flex-fill">1</div>
          <div class="border border-success bg-gradient flex-fill">2</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import BarChartComp from '@/echarts/components/BarChartComp.vue';
import LineChartComp from '@/echarts/components/LineChartComp.vue';
defineOptions({
  name: 'EchartsAndVue',
});

const lineChartOptions = {
  title: {
    text: '一周气温变化',
  },

  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    axisLabel: {
      formatter: '{value} °C',
    },
  },
  series: [
    {
      name: 'Highest',
      data: [10, 11, 13, 11, 12, 12, 9],
    },
    {
      name: 'Lowest',
      data: [1, -2, 2, 5, 3, 2, 0],
    },
  ],
};
</script>

<style></style>
