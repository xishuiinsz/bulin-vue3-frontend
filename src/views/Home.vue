<template>
	<div class="home-page-container">
		<v-header />
		<div class="body-container">
			<v-sidebar />
			<div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
				<v-tags></v-tags>
				<div class="content">
					<router-view v-slot="{ Component }">
						<transition name="move" mode="out-in">
							<keep-alive :include="tags.nameList">
								<component :is="Component" />
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
import vHeader from '../components/Header.vue'
import vSidebar from '../components/Sidebar.vue'
import vTags from '../components/Tags.vue'
export default {
	components: {
		vHeader,
		vSidebar,
		vTags
	},
	setup () {
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
		flex: 1;
		display: flex;
	}
}
</style>
