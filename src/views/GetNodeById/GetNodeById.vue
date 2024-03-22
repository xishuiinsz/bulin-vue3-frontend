<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-redpacket_fill"></i> 根据ID获取节点
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="plugins-tips">
        <div class="input-output-block" style="display: flex; justify-content: space-between; padding: 0 24px">
          <div class="input-block">
            输入
            <pre>
          <code>
           {{ tree }}
          </code>
        </pre>
          </div>
          <div>当前节点：{{ id }}</div>
          <div class="output-block">
            输出
            <pre>
          <code>
           {{ out }}
          </code>
        </pre>
          </div>
        </div>
      </div>
      <div>
        <el-form label-width="120px">
          <el-form-item label="将代码贴在此处">
            <el-input v-model="codesTxt" :rows="10" type="textarea" placeholder="Please input" />
          </el-form-item>
        </el-form>
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
import getNodeById from './getNode'
const tree = {
  id: '1',
  label: 'first',
  children: [
    {
      id: '2',
      label: 'second'
    },
    {
      id: '3',
      label: 'third',
      children: [
        {
          id: '4',
          label: 'fourth'
        },
        {
          id: '5',
          label: 'fifth'
        }
      ]
    }
  ]
}
export default {
  name: 'SortArray',
  setup () {
    const out = ref('')
    const id = ref('1')
    const codesTxt = ref(getNodeById.toString())
    const transfer = () => {
      id.value = ['1', '2', '3', '4', '5'][getRangeInteger(0, 4)]
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
      // 通过js api计算出来的结果
      try {
        // 自定义函数计算出来的结果
        const result = funcTemp(id.value, tree)
        out.value = result
      } catch (error) {
        console.error(error)
      }
    }
    transfer()
    return {
      tree,
      out,
      id,
      transfer,
      codesTxt
    }
  }
}
</script>

<style>

</style>
