<template>
  <el-scrollbar @scroll="scrollEvt" class="img-waterfall-container h-100">
    <div v-if="list.some((item) => item.length)" class="waterfall-item" v-for="(data, index) in list" :key="index">
      <div class="img-wrap" v-for="(item, subIndex) in data" :key="item.name">
        <img :loading="item.order > lazyNum ? 'lazy' : 'eager'" class="img" :src="item.url" alt="" srcset="" />
      </div>
    </div>
    <el-empty class="mx-auto h-100" v-else :image-size="200" />
  </el-scrollbar>
</template>
<script setup>
import axios from 'axios';
import { computed, onMounted, reactive } from 'vue';
const listInit = [];
const groupNum = 3;
const lazyNum = 10;
const cache = {
  flag: false,
  ob: null,
  lastPic: null,
  total: 0,
  pageIndex: 1,
  pageSize: 35,
};
for (let index = 0; index < groupNum; index++) {
  listInit.push([]);
}
const list = reactive(listInit);
const loadedPicsNum = computed(() => {
  return list.map((item) => item.length).reduce((a, b) => a + b);
});
const fetchImages = async () => {
  const { pageIndex, pageSize } = cache;
  const url = `${location.origin}/api/images/list?pageIndex=${pageIndex}&pageSize=${pageSize}`;
  try {
    const resp = await axios.get(url);
    if (resp?.data?.code === '0') {
      resp.data.total && Object.assign(cache, { total: resp.data.total });
      if (resp.data?.data.length) {
        const listImg = resp.data.data;
        listImg.forEach((item, index) => {
          Object.assign(item, { order: index + 1 });
          const vol = index % groupNum;
          list[vol].push(item);
        });
      }
    }
  } catch (error) {}
};
const loadMorePics = () => {
  // 取消 observe 最后的图片元素
  cache.ob instanceof IntersectionObserver && cache.ob.disconnect(cache.lastPic);
  Object.assign(cache, { flag: false, ob: null, lastPic: null });
  cache.pageIndex++;
  fetchImages();
};
// 找寻离浏览器容器视口最近的、末尾的相片
const findClosestPic = () => {
  const list = Array.from(document.querySelectorAll('.img-waterfall-container .waterfall-item')).map((el) => {
    const distance = el.getBoundingClientRect().bottom;
    return { distance, el };
  });
  const sortedList = list.sort((a, b) => a.distance - b.distance);
  const [fitEl] = sortedList;
  cache.lastPic = Array.from(fitEl.el.children).at(-1);
  const obChange = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      loadedPicsNum.value < cache.total && loadMorePics();
    }
  };
  cache.ob = new IntersectionObserver(obChange);
  cache.ob.observe(cache.lastPic);
};

const scrollEvt = ({ scrollTop }) => {
  if (!cache.flag) {
    findClosestPic();
    Object.assign(cache, { flag: true });
  }
};
onMounted(fetchImages);
</script>
<style lang="scss">
.img-waterfall-container {
  padding: 0 20px;
  box-sizing: border-box;

  &.el-scrollbar {
    width: 100%;

    .el-scrollbar__wrap {
      width: 100%;

      .el-scrollbar__view {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .waterfall-item {
          background-color: #fff;
          width: 33%;
          height: fit-content;

          .img-wrap {
            width: 100%;

            .img {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
