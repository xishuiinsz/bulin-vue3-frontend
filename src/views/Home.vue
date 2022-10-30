<template>
  <div class="home-page-container">
    <div class="body-container">
      <v-sidebar />
      <div
        class="content-box"
        :class="{ 'content-collapse': sidebar.collapse }"
      >
        <v-tags></v-tags>
        <div class="content">
          <router-view v-slot="{ Component }">
            <transition name="move" mode="out-in">
              <keep-alive :key="Component.name" :include="tags.nameList">
                <component :is="Component" :key="Component.name" />
              </keep-alive>
            </transition>
          </router-view>
          <!-- <el-backtop target=".content"></el-backtop> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useSidebarStore } from '../store/sidebar'
import { useTagsStore } from '../store/tags'
import vSidebar from '../components/Sidebar.vue'
import vTags from '../components/Tags.vue'
export default {
  components: {
    vSidebar,
    vTags
  },
  setup() {
    const sidebar = useSidebarStore()
    const tags = useTagsStore()
    return {
      tags,
      sidebar
    }
  }
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
</style>
