<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card
          shadow="hover"
          class="mgb20"
          style="height: 252px"
        >
          <div class="user-info">
            <img
              src="../assets/img/img.jpg"
              class="user-avator"
              alt
            />
            <div class="user-info-cont">
              <div class="user-info-name">{{ name }}</div>
              <div>{{ role }}</div>
            </div>
          </div>
          <div class="user-info-list">
            上次登录时间：
            <span>2024-07-20</span>
          </div>
          <div class="user-info-list">
            上次登录地点：
            <span>武汉</span>
          </div>
        </el-card>
        <el-card
          shadow="hover"
          style="height: 252px"
        >
          <template #header>
            <div class="clearfix">
              <span>语言详情</span>
            </div>
          </template>
          Vue
          <el-progress
            :percentage="71.3"
            color="#42b983"
          ></el-progress
          >JavaScript
          <el-progress
            :percentage="24.1"
            color="#f1e05a"
          ></el-progress
          >CSS <el-progress :percentage="13.7"></el-progress>HTML
          <el-progress
            :percentage="5.9"
            color="#f56c6c"
          ></el-progress>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card shadow="hover">
          <template #header>
            <div class="clearfix">
              <span>更新日志</span>
            </div>
          </template>

          <div class="change-log">
            <div
              v-highlight
              v-html="logs"
              class="markdown-content"
            ></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { marked } from 'marked';
  import { reactive, ref, onMounted } from 'vue';
  import logsMarkdown from '@/logs.md?raw';
  export default {
    name: 'Dashboard',
    setup() {
      const name = window.localStorage.getItem('ms_username');
      const role = name === 'admin' ? '超级管理员' : '普通用户';
      const logs = ref('');
      const data = reactive([
        {
          name: '2018/09/04',
          value: 1083,
        },
        {
          name: '2018/09/05',
          value: 941,
        },
        {
          name: '2018/09/06',
          value: 1139,
        },
        {
          name: '2018/09/07',
          value: 816,
        },
        {
          name: '2018/09/08',
          value: 327,
        },
        {
          name: '2018/09/09',
          value: 228,
        },
        {
          name: '2018/09/10',
          value: 1065,
        },
      ]);
      const options = {
        type: 'bar',
        title: {
          text: '最近一周各品类销售图',
        },
        xRorate: 25,
        labels: ['周一', '周二', '周三', '周四', '周五'],
        datasets: [
          {
            label: '家电',
            data: [234, 278, 270, 190, 230],
          },
          {
            label: '百货',
            data: [164, 178, 190, 135, 160],
          },
          {
            label: '食品',
            data: [144, 198, 150, 235, 120],
          },
        ],
      };
      const options2 = {
        type: 'line',
        title: {
          text: '最近几个月各品类销售趋势图',
        },
        labels: ['6月', '7月', '8月', '9月', '10月'],
        datasets: [
          {
            label: '家电',
            data: [234, 278, 270, 190, 230],
          },
          {
            label: '百货',
            data: [164, 178, 150, 135, 160],
          },
          {
            label: '食品',
            data: [74, 118, 200, 235, 90],
          },
        ],
      };
      const todoList = reactive([
        {
          title: '今天要修复100个bug',
          status: false,
        },
        {
          title: '今天要修复100个bug',
          status: false,
        },
        {
          title: '今天要写100行代码加几个bug吧',
          status: false,
        },
        {
          title: '今天要修复100个bug',
          status: false,
        },
        {
          title: '今天要修复100个bug',
          status: true,
        },
        {
          title: '今天要写100行代码加几个bug吧',
          status: true,
        },
      ]);
      onMounted(() => {
        logs.value = marked(logsMarkdown);
      });
      return {
        name,
        data,
        options,
        options2,
        todoList,
        role,
        logs,
      };
    },
  };
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }

  .grid-content {
    display: flex;
    align-items: center;
    height: 100px;
  }

  .grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
  }

  .grid-num {
    font-size: 30px;
    font-weight: bold;
  }

  .grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
  }

  .grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
  }

  .grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
  }

  .grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
  }

  .grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
  }

  .user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
  }

  .user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  .user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
  }

  .user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
  }

  .user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
  }

  .user-info-list span {
    margin-left: 70px;
  }

  .mgb20 {
    margin-bottom: 20px;
  }

  .todo-item {
    font-size: 14px;
  }

  .todo-item-del {
    text-decoration: line-through;
    color: #999;
  }

  .schart {
    width: 100%;
    height: 300px;
  }
</style>
<style lang="scss">
  .change-log {
    .markdown-content {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';

      h3 {
        margin-top: 20px;

        &:nth-of-type(1) {
          margin-top: 0;
        }
      }

      > ul {
        padding-left: 20px;

        > li > ul {
          padding-left: 20px;
        }
      }
    }
  }
</style>
