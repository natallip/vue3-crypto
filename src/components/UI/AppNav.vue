<template>
	<svg-sprite />
	<div class="nav">
		<div class="container">
			<ul class="breadcrumbs">
				<li
					v-for="(item, ind) in breadcrumbsList"
					:key="item"
					:class="{ active: isActive(item) }"
					class="breadcrumbs__item"
					@click="routeTo(ind)"
				>
					<div class="breadcrumbs__text">{{ item.name }}</div>
					<div v-if="isActive(item)" class="breadcrumbs__icon">
						<app-icon id="trg" width="20" height="30" />
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import AppIcon from "@/components/UI/AppIcon.vue";
import SvgSprite from "@/components/UI/SvgSprite.vue";

export default {
	components: { AppIcon, SvgSprite },
	data() {
		return {
			breadcrumbsList: [],
		};
	},
	mounted() {
		this.updateList();
	},
	methods: {
		isActive(item) {
			return !!item.link;
		},
		updateList() {
			this.breadcrumbsList = this.$route.meta.breadcrumbs;

			if (this.$route.params.id) {
				this.breadcrumbsList.map((item) => {
					if (item.name === "ticker") {
						item.name = this.$route.params.id;
						return;
					}
				});
			}
		},
		routeTo(ind) {
			if (this.breadcrumbsList[ind].link) this.$router.push(this.breadcrumbsList[ind].link);
		},
	},
	watch: {
		$route() {
			this.updateList();
		},
	},
};
</script>

<style scoped>
.nav {
	color: #000;
	padding: 20px 0;
}
.breadcrumbs {
	display: inline-flex;
	align-items: center;
	border: 1px solid #4e0281;
	margin: 0 0 0 auto;
}
.breadcrumbs__item {
	margin-right: 10px;
	display: flex;
	align-items: center;
}
.breadcrumbs__text {
	background: #fff;
	position: relative;
	z-index: 2;
}
.breadcrumbs__icon {
	margin-left: -2px;
}
.breadcrumbs__item.active .breadcrumbs__text {
	padding: 5px;
	padding-left: 10px;
	font-weight: bold;
	border-right-color: transparent;
	color: #4e0281;
	cursor: pointer;
}
.breadcrumbs__item:last-child() {
	margin-right: 0;
	border: none;
}
</style>
