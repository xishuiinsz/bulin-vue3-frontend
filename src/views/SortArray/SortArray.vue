<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-redpacket_fill"></i> 数组排序(不可使用sort方法)
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="plugins-tips">
        输入 {{ arrRandom }}，输出 {{ arrComputed }}
      </div>
      <div>
        <el-form label-width="120px">
          <el-form-item label="将代码贴在此处">
            <el-input
              v-model="codesTxt"
              :rows="10"
              type="textarea"
              placeholder="Please input"
            /> </el-form-item
        ></el-form>
        <el-button @click="transfer" type="primary">执行</el-button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-eval */
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getRangeInteger } from '@/utils'
import isEqual from 'lodash/isEqual'
import cloneDeep from 'lodash/cloneDeep'
import customeSort from './sort'
// 获取随机数组成的数组
const getRandomArray = (length = 10) =>
  new Array(length).fill(1).map((num) => num * getRangeInteger(1, 30))

export default {
  name: 'SortArray',
  setup() {
    // 初始化函数文本
    const codesTxt = ref(customeSort.toString())
    // 响应式输入数组
    const arrRandom = ref('')
    // 响应式输出数组
    const arrComputed = ref('')

    // 执行 点击事件
    const transfer = () => {
      if (!codesTxt.value || !codesTxt.value.trim()) {
        ElMessage.error('请输入代码！')
      }
      const code = codesTxt.value.trim()
      // 这里换成正则判断是否为函数声明更为精准，可惜没找到
      if (!code.startsWith('function ') || !code.endsWith('}')) {
        ElMessage.error('代码片段必须以function声明')
        return
      }
      // 提取函数名
      const funcName = code.match(/^function(.*?)\(/)[1].trim()
      if (!funcName) {
        ElMessage.error('请输入函数代码！')
        return
      }
      // 将字符串转化成函数声明
      // eslint-disable-next-line no-new-func
      const funcTemp = new Function(`return ${code}`)()
      const arrRawRandom = getRandomArray()
      arrRandom.value = arrRawRandom
      // 通过js api计算出来的结果
      const resultSortedApi = cloneDeep(arrRawRandom).sort((a, b) => a - b)
      try {
        // 自定义函数计算出来的结果
        const result = funcTemp(cloneDeep(arrRawRandom))
        arrComputed.value = result
        // 比较结果
        if (isEqual(result, resultSortedApi)) {
          ElMessage.success('通过')
        } else {
          ElMessage.error('不通过')
        }
      } catch (error) {
        console.error(error)
      }
    }
    transfer()
    return {
      arrRandom,
      arrComputed,
      codesTxt,
      transfer
    }
  }
}
</script>

<style></style>
