<template>
  <el-popover
    popper-class="china-cities-picker"
    :show-arrow="false"
    placement="bottom-start"
    :width="600"
    v-model:visible="visible"
    trigger="manual"
  >
    <el-tabs
      v-model="acitveItem"
      class="demo-tabs"
    >
      <el-tab-pane
        label="热门城市"
        name="hot"
      >
        <div>
          <span
            @click.stop.prevent="cityClickEvt(city)"
            class="city-item"
            v-for="city in hotCities"
          >
            {{ city }}</span
          >
        </div>
      </el-tab-pane>
      <el-tab-pane
        v-for="group in cityGroupList"
        :key="group.nameList.join('')"
        :label="group.nameList.join('')"
        :name="group.nameList.join('')"
      >
        <el-scrollbar max-height="600px">
          <div v-for="city in group.cities">
            <span class="city-item">{{ city.name }}</span>
            <span
              @click.stop="cityClickEvt(c)"
              class="city-item"
              v-for="c in city.cities"
            >
              {{ c }}</span
            >
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
    <template #reference>
      <el-input
        class="chosen-city-input"
        @click="inputClickEvt"
        readonly
        v-model="chosenCity"
      ></el-input>
    </template>
  </el-popover>
</template>

<script setup name="ChinaCitiesPicker">
  import { computed, onMounted, ref, toRaw, watch } from 'vue';
  import { ElTabPane, ElTabs, ElScrollbar, ElInput, ElPopover } from 'element-plus';
  import axios from 'axios';
  const emits = defineEmits(['update:modelValue', 'change']);
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
  });
  const visible = ref(false);
  const groupNum = 4;
  const acitveItem = ref('hot');
  // 初始化选择的city
  const chosenCity = ref(props.modelValue);
  // 监听并同步更新父组件modelValue值
  watch(
    () => props.modelValue,
    (newVal) => {
      chosenCity.value = newVal;
    }
  );
  // 从后台返回的全部城市list
  const cityList = ref([]);
  // 城市分组计算
  const cityGroupList = computed(() => {
    const initElement = { cities: [], nameList: [] };
    const groups = [structuredClone(initElement)];
    const restCities = cityList.value.slice(1);
    restCities.forEach((city) => {
      if (groups.at(-1).nameList?.length >= groupNum) {
        const clonedOption = structuredClone(initElement);
        groups.push(clonedOption);
      }
      const rawCity = toRaw(city);
      groups.at(-1).cities.push(rawCity);
      groups.at(-1).nameList.push(rawCity.name);
    });
    return groups;
  });
  // 热门城市计算
  const hotCities = computed(() => {
    const _hotCities = [];
    if (cityList.value.length) {
      const [firstItem] = cityList.value;
      if (firstItem.name === 'hot') {
        _hotCities.push(...firstItem.cities);
      }
    }
    return _hotCities;
  });

  // 单个城市单击事件
  const cityClickEvt = (city) => {
    chosenCity.value = city;
    emits('update:modelValue', chosenCity.value);
    emits('change', chosenCity.value);
    visible.value = false;
  };
  // input框单击事件
  const inputClickEvt = () => {
    acitveItem.value = 'hot';
    visible.value = !visible.value;
  };
  // 获取全部城市list
  const fetchCitiesList = async () => {
    const resp = await axios.get('/chinaCities.json');
    if (resp?.data?.length) {
      cityList.value = resp.data;
    }
  };
  onMounted(fetchCitiesList);
</script>

<style lang="scss" scoped>
  .china-cities-picker {
    .city-item {
      display: inline-block;
      width: 100px;
      height: 30px;
      line-height: 24px;
      cursor: pointer;
    }
  }
</style>
