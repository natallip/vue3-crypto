<template>
	<div class="breadcrumbs-wrap">
		<ul class="breadcrumbs">
			<router-link
				v-for="item in breadcrumbsList"
				class="breadcrumbs__link"
				:key="item.name"
				:to="item.link"
			>
				{{ item.name }}
			</router-link>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			breadcrumbsList: [],
		};
	},
	mounted() {
		this.updateList();
	},
	methods: {
		updateList() {
			this.breadcrumbsList = this.$route.meta.breadcrumbs;

			if (this.$route.params.id) {
				this.breadcrumbsList.map((item) => {
					if (item.name === "ticker") {
						item.name = this.$route.params.id;
						item.link = this.$route.path;
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
.breadcrumbs__wrap,
.breadcrumbs {
	display: flex;
	align-items: center;
}
.breadcrumbs__link {
	position: relative;
	padding: 5px;
	margin-right: 10px;
	cursor: pointer;
}
.breadcrumbs__link::after {
	content: "/";
	position: absolute;
	top: 6px;
	right: -6px;
	color: #555;
}
.breadcrumbs__link:last-child {
	color: #4e0281;
	cursor: default;
}
.breadcrumbs__link:last-child::after {
	display: none;
}
</style>
