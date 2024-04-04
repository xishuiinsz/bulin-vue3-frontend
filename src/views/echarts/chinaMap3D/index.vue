<template>
    <div style="width: 100%;height: 100%;" class="china-map" ref="chinaMap"></div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts'
import china from './china.json'
const chinaMap = ref(null);
// 方法
function chinaEchart() {
    //注册地图，这个特别重要
    echarts.registerMap('china', china)
    let myChart = echarts.init(chinaMap.value);
    //echart 配制option  
    var options = {
        tooltip: {
            show: true,
            triggerOn: "mousemove",   //mousemove、click
            padding: [4, 8],
            borderWidth: 1,
            borderColor: '#409eff',
            backgroundColor: 'rgba(255,255,255,0.7)',
            textStyle: {
                color: '#000000',
                fontSize: 13
            },
            formatter: function (e) {
                return e.name;
            }
        },
        geo: [
            // 第一层
            {
                map: "china",
                z: 3,
                zoom: 1.2,
                aspectScale: 0.85,
                roam: true,
                top: '10%',
                layoutSize: "100%", //保持地图宽高比
                regions: [
                    { // 隐藏南海诸岛,因为顶层已经添加过了
                        name: '南海诸岛',
                        itemStyle: {
                            borderWidth: 0.5,
                            shadowBlur: 0,
                            borderColor: '#61aacb',
                            areaColor: '#104584'
                        }
                    }
                ],
                itemStyle: {
                    borderColor: '#c8feff',
                    borderWidth: 0.5,
                    shadowBlur: 3,
                    shadowColor: '#66edff',
                    areaColor: '#0862db'
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        borderWidth: 1,
                        areaColor: '#2da9ff',
                    },
                    label: {
                        show: false,
                        color: '#ffffff',
                    }
                },
                select: {
                    itemStyle: {
                        shadowBlur: 10,
                        borderWidth: 1,
                        areaColor: '#2da9ff',
                    },
                    label: {
                        color: '#ffffff',
                    }
                }
            },
            // 第二层
            {
                map: "china",
                z: 2,
                zoom: 1.2,
                aspectScale: 0.85,
                roam: false,
                silent: true,
                top: '10%',
                layoutSize: "100%", //保持地图宽高比
                regions: [
                    { // 隐藏南海诸岛,因为顶层已经添加过了
                        name: '南海诸岛',
                        itemStyle: {
                            opacity: 0 // 为 0 时不绘制该图形
                        },
                        label: {
                            show: false
                        }
                    }
                ],
                itemStyle: {
                    borderColor: '#d8feff',
                    borderWidth: 3,
                    shadowBlur: 10,
                    shadowColor: '#22a1ff',
                    areaColor: '#0862db',
                    shadowOffsetX: 0,
                    shadowOffsetY: 8
                },
            },
            // 第三层
            {
                map: "china",
                z: 1,
                zoom: 1.2,
                aspectScale: 0.85,
                top: '11.5%',
                silent: true,
                layoutSize: "100%", //保持地图宽高比
                itemStyle: {
                    borderColor: '#c8feff',
                    borderWidth: 1,
                    shadowBlur: 0,
                    shadowColor: '#99c4ff',
                    areaColor: '#4ebaff',
                },
                regions: [
                    { // 隐藏南海诸岛,因为顶层已经添加过了
                        name: '南海诸岛',
                        itemStyle: {
                            opacity: 0 // 为 0 时不绘制该图形
                        },
                        label: {
                            show: false
                        }
                    }
                ],
            },
            // 第四层
            {
                map: "china",
                z: 0,
                zoom: 1.2,
                aspectScale: 0.85,
                top: '12%',
                silent: true,
                layoutSize: "100%", //保持地图宽高比
                itemStyle: {
                    borderColor: '#66edff',
                    borderWidth: 2,
                    shadowBlur: 20,
                    shadowColor: '#4d99ff',
                    areaColor: '#1752ad',
                    shadowOffsetX: 0,
                    shadowOffsetY: 8
                },
                regions: [
                    { // 隐藏南海诸岛,因为顶层已经添加过了
                        name: '南海诸岛',
                        itemStyle: {
                            opacity: 0 // 为 0 时不绘制该图形
                        },
                        label: {
                            show: false
                        }
                    }
                ],
            },
        ],
        series: [
            // 地图
            {
                type: "map",
                geoIndex: 0,
                data: []
            }
        ]
    }
    myChart.setOption(options);
}
onMounted(chinaEchart)
</script>