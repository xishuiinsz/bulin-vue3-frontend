<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-redpacket_fill"></i>
          如何使用vue组件来渲染echarts中的tooltip组件？
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="plugins-tips">
        如何使用vue组件来渲染echarts中的tooltip组件？
      </div>
      <div>
        <div>
          来自百度的
          <a href="https://echarts.apache.org/examples/zh/editor.html?c=bar1">柱状图示例</a>
          <div v-resize="resizeHanler" style="width: 80%; aspect-ratio: 2; margin-top: 16px" id="chart-container"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import echarts from '@/echarts'
import { onMounted, createApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import MyTooltip from './MyTooltip.vue'
let echartsIntance;
const resizeHanler = () => {
  echartsIntance?.resize?.()
}

const myTooltipFormatter = async (params) => {
  const htmlTemplate = await renderToString(createApp(MyTooltip, { list: params }))
  return htmlTemplate
}

const option = {
  title: {
    text: 'Rainfall vs Evaporation',
    subtext: 'Fake Data'
  },
  tooltip: {
    trigger: 'axis',
    transitionDuration: false,
    axisPointer: {
      type: 'shadow'
    },
    formatter: (params, ticket, callback) => {
      myTooltipFormatter(params).then((result) => {
        callback(ticket, result)
      })
      return '计算中...'
    }
  },
  legend: {
    data: ['Rainfall', 'Evaporation']
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Rainfall',
      type: 'bar',
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ],
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      }
    },
    {
      name: 'Evaporation',
      type: 'bar',
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
      ],
      markPoint: {
        data: [
          { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
          { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      }
    }
  ]
}
onMounted(() => {
  const dom = document.querySelector('#chart-container')
  echartsIntance = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  })
  if (option && typeof option === 'object') {
    echartsIntance.setOption(option)
  }
  window.addEventListener('resize', echartsIntance.resize)
})
</script>
<script>
export default {
  name: 'EchartsAndVue'
}
</script>

<style></style>
