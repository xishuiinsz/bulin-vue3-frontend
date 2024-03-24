<template>
  <div class="home-page-container">
    <div class="body-container">
      <v-sidebar />
      <div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
        <v-tags></v-tags>
        <div class="main-content" :class="kebabCase(route.name)">
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
import { useRoute } from 'vue-router';
import { useSidebarStore } from '../store/sidebar'
import { useTagsStore } from '../store/tags'
import vSidebar from '../components/Sidebar.vue'
import vTags from '../components/Tags.vue'
import kebabCase from 'lodash/kebabCase'
const route = useRoute();
const sidebar = useSidebarStore()
const tags = useTagsStore()

</script>
<script>
export default {
  name: 'HomePage'
}
</script>
<style lang="scss">
.home-page-container {
  height: 100%;
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
