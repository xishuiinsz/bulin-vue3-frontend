<template>
    <div class="flow-charts-by-cavnvas">
        <h4><a rel="noreferrer noreferrer" target="_blank"
                href="https://blog.csdn.net/qq_43225508/article/details/128806191" class="href">Canvas 绘制三段式审批流程图，来自CSDN</a>
        </h4>

        <div ref="root" v-resize="resizeHandler" class="flow-charts-container">
            <div class="html-flow-charts-container">
                <div class="flow-list" v-for="item in  flowData">
                    <div class="flow-item" v-for="sub in item">
                        <div class="name">
                            <el-icon :color="sub.color">
                                <UserFilled />
                            </el-icon>{{ sub.userName }}
                        </div>
                        <div class="state">
                            {{ sub.state }}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, nextTick } from 'vue';

const flowData = [
    [{
        userName: '刘备',
        state: '发起申请',
        color: 'rgba(37, 137, 255, 1)',
    }],
    [
        {
            userName: '张飞',
            state: '同意',
            color: 'rgba(53, 195, 185, 1)'
        },
        {
            userName: '赵云',
            state: '待审批',
            color: 'rgba(245, 172, 86, 1)'
        },
        {
            userName: '曹操',
            state: '驳回',
            color: 'rgba(212, 48, 48, 1)'
        },
    ],
    [
        {
            userName: '张总',
            state: '核准',
            color: 'rgba(53, 195, 185, .5)'
        }
    ]
]
const root = ref(null)
/**
 *
 * @param {HTMLDivElement} container
 */
const createCanvas = (container = root.value) => {
    const tagCanvas = 'canvas'
    if (container.firstElementChild.tagName.toLowerCase() !== tagCanvas) {
        const element = document.createElement(tagCanvas)
        Object.assign(element.style, { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' })
        container.insertBefore(element, container.firstElementChild)
    }
    const canvas = container.firstElementChild
    canvas.width = container.offsetWidth * devicePixelRatio
    canvas.height = container.offsetHeight * devicePixelRatio
    return container.firstElementChild
}

const getScaledValue = (value, scale = window.devicePixelRatio) => {
    return value * scale
}
/**
 * 绘制圆点
 *
 * @param {CanvasRenderingContext2D} context 画布上下文
 * @param {Object} pointer 中心点
 * @param {Number} 半径
 */
const drawCircle = (context, pointer, r = 3) => {
    context.beginPath();
    context.fillStyle = 'blue'
    context.arc(getScaledValue(pointer.x), getScaledValue(pointer.y), getScaledValue(r), 0, 2 * Math.PI)
    context.fill()
    context.closePath()
}
const drawCanvas = () => {
    const canvas = createCanvas()
    const htmlContainer = canvas.nextElementSibling
    const [firstElement, secondElement, thirdElement] = Array.from(htmlContainer.children)
    const { x: xCanvas, y: yCanvas } = canvas.getBoundingClientRect()
    const { right: rightFirst } = firstElement.getBoundingClientRect()
    const { left: leftSecond, right: rightSecond, y: ySecond, height: heightSecond } = secondElement.getBoundingClientRect()
    const { x: xThird, y: yThird, height: heightThird } = thirdElement.getBoundingClientRect()
    const center1 = { x: (rightFirst - xCanvas) + (leftSecond - rightFirst) / 2, y: (ySecond - yCanvas) + heightSecond / 2 }
    const center2 = { x: rightSecond - xCanvas + (xThird - rightSecond) / 2, y: (ySecond - yCanvas) + heightSecond / 2 }
    const ctx = canvas.getContext('2d')
    drawCircle(ctx, center1)
    drawCircle(ctx, center2)
}
const drawCanvasDelay = () => {
    nextTick(drawCanvas)
}
const resizeHandler = () => {
    drawCanvasDelay()
}
onMounted(drawCanvasDelay)
</script>
<style lang="scss" scoped>
.flow-charts-by-cavnvas {
    padding: 24px;

    .flow-charts-container {
        margin-top: 24px;
        position: relative;

        .html-flow-charts-container {
            position: relative;
            display: flex;
            column-gap: 60px;
            align-items: center;
            // background-color: green;

            .flow-list {
                width: 90px;
                display: flex;
                flex-direction: column;
                row-gap: 16px;

                .flow-item {
                    border: 1px solid #e1e1e1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    row-gap: 12px;
                    padding: 12px 0;
                    border-radius: 4px;
                }
            }
        }

    }
}
</style>
