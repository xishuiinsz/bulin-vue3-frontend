<template>
    <div class="china-map-container">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-pie-chart"></i> 中国地图
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container component-content">
            <div style="width: 100%;height: 100%;" ref="refMap"></div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { registerMap, init, getMap } from 'echarts';
import { fetchMapJson } from '@i';
import useResizeObserver from '@h/useResizeObserver';
const chinaMap = 'china'
const refMap = ref(null);
const cache = {
    chartInstance: null
}

const getOption = () => {
    const option = {
        geo: {
            map: chinaMap,
            roam: true,
            zoom: 1.2
        }
    }
    return option
}

const renderCharts = () => {
    if (!cache.chartInstance) {
        cache.chartInstance = init(refMap.value)


    }
    const option = getOption();
    cache.chartInstance?.setOption(option)
}

const trimNanhaiZhudao = (json) => {
    const index = json.features.findIndex(item => item.properties.adcode === '100000_JD')
    if (index > -1) {
        json.features.splice(index, 1)
    }
    const coordinates = [
        [
            [
                [110.106396, 20.026812],
                [110.042339, 19.991384],
                [109.997375, 19.980136],
                [109.965346, 19.993634],
                [109.898825, 19.994196],
                [109.855093, 19.984073],
                [109.814441, 19.993072],
                [109.76147, 19.981261],
                [109.712195, 20.017253],
                [109.657993, 20.01163],
                [109.585312, 19.98801],
                [109.526797, 19.943573],
                [109.498464, 19.873236],
                [109.411001, 19.895184],
                [109.349407, 19.898561],
                [109.300748, 19.917693],
                [109.25948, 19.898561],
                [109.255784, 19.867045],
                [109.231147, 19.863105],
                [109.159082, 19.79048],
                [109.169553, 19.736411],
                [109.147379, 19.704863],
                [109.093792, 19.68965],
                [109.048829, 19.619764],
                [108.993394, 19.587065],
                [108.92872, 19.524468],
                [108.855424, 19.469182],
                [108.806148, 19.450561],
                [108.765496, 19.400894],
                [108.694047, 19.387346],
                [108.644772, 19.349518],
                [108.609048, 19.276661],
                [108.591186, 19.141592],
                [108.598577, 19.055633],
                [108.630606, 19.003017],
                [108.637997, 18.924346],
                [108.595497, 18.872256],
                [108.593033, 18.809386],
                [108.65278, 18.740258],
                [108.663866, 18.67337],
                [108.641077, 18.565614],
                [108.644772, 18.486738],
                [108.68912, 18.447571],
                [108.776583, 18.441894],
                [108.881293, 18.416344],
                [108.905315, 18.389087],
                [108.944735, 18.314107],
                [109.006329, 18.323198],
                [109.108575, 18.323766],
                [109.138756, 18.268081],
                [109.17448, 18.260125],
                [109.287813, 18.264671],
                [109.355566, 18.215221],
                [109.441182, 18.199303],
                [109.467051, 18.173718],
                [109.527413, 18.169169],
                [109.584696, 18.143579],
                [109.661688, 18.175424],
                [109.726362, 18.177698],
                [109.749767, 18.193618],
                [109.785492, 18.339672],
                [109.919767, 18.375457],
                [110.022629, 18.360121],
                [110.070672, 18.376025],
                [110.090382, 18.399309],
                [110.116867, 18.506602],
                [110.214186, 18.578662],
                [110.246215, 18.609859],
                [110.329366, 18.642185],
                [110.367555, 18.631977],
                [110.499366, 18.651824],
                [110.499366, 18.751592],
                [110.578206, 18.784458],
                [110.590525, 18.838841],
                [110.585597, 18.88075],
                [110.619474, 19.152334],
                [110.676756, 19.286264],
                [110.706321, 19.320153],
                [110.729727, 19.378878],
                [110.787009, 19.399765],
                [110.844292, 19.449996],
                [110.888023, 19.518827],
                [110.920668, 19.552668],
                [111.008747, 19.60398],
                [111.061718, 19.612436],
                [111.071573, 19.628784],
                [111.043856, 19.763448],
                [111.013675, 19.850159],
                [110.966248, 20.018377],
                [110.940994, 20.028499],
                [110.871393, 20.01163],
                [110.808567, 20.035808],
                [110.778386, 20.068415],
                [110.744509, 20.074036],
                [110.717408, 20.148778],
                [110.687843, 20.163947],
                [110.655814, 20.134169],
                [110.562191, 20.110006],
                [110.526467, 20.07516],
                [110.495054, 20.077408],
                [110.387265, 20.113378],
                [110.318279, 20.108882],
                [110.28933, 20.056047],
                [110.243135, 20.077408],
                [110.144585, 20.074598],
                [110.106396, 20.026812]
            ]
        ]
    ]
    const [hainansheng] = json.features.filter(item => item.properties.name === '海南省')
    if (hainansheng) {
        Object.assign(hainansheng.geometry, { coordinates })
    }
    return json
}

const initCharts = async () => {
    const chinaMapJson = await fetchMapJson('100000')
    registerMap(chinaMap, trimNanhaiZhudao(chinaMapJson));
    renderCharts();
}

const resizeHandler = () => {
    cache.chartInstance?.resize()
}

onMounted(initCharts);
useResizeObserver(refMap, resizeHandler);
</script>
<script>
export default {
    name: "ChinaMap",
};
</script>

<style lang="scss" scoped>
.china-map-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .component-content {
        flex: 1 1 auto;
    }
}
</style>