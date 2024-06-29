<template>
  <div class="home-page-container">
    <div class="body-container">
      <v-sidebar />
      <div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
        <v-tags></v-tags>
        <div ref="scrollRef" class="main-content w-100 h-100" :class="kebabCase(route.name)">
          <router-view v-slot="{ Component }">
            <transition name="move" mode="out-in">
              <keep-alive :key="Component.name" :include="tags.nameList">
                <component :is="Component" :key="Component.name" />
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useSidebarStore } from '../store/sidebar';
import { useTagsStore } from '../store/tags';
import vSidebar from '../components/Sidebar.vue';
import vTags from '../components/Tags.vue';
import kebabCase from 'lodash/kebabCase';
import { useBindScrollEvt } from '@h/useScrollEvt';
const route = useRoute();
const sidebar = useSidebarStore();
const tags = useTagsStore();
const scrollRef = ref(null);
useBindScrollEvt(scrollRef);
</script>
<script>
export default {
  name: 'HomePage',
};
</script>
<style lang="scss">
.home-page-container {
  height: calc(100% - 70px);
  display: flex;
  flex-direction: column;

  .body-container {
    height: calc(100vh - 70px);
    display: flex;
  }
}

.content.welcome-page {
  padding: 0;
}
</style>
