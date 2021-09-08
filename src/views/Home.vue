<template>
	<div class="container">
		<h1>Top coins by their total volume across all markets in the last 24 hours</h1>
		<app-loader v-if="isLoading" />
		<table-with-filter-and-pagination
			:options="options"
			:titles="titles"
			:records="records"
			:pages="pages"
			:activePage="activePage"
			:filter="filter"
			@click="changeActivePage($event)"
			@filter="changeAndSaveFilter($event)"
			@change="changeCountOnPage($event.target.value)"
		/>
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import TableWithFilterAndPagination from "@/components/table/TableWithFilterAndPagination.vue";
import AppLoader from "@/components/UI/AppLoader.vue";

export default {
	data() {
		return {
			isLoading: false,
		};
	},
	components: { TableWithFilterAndPagination, AppLoader },
	computed: {
		...mapState("table", ["activePage", "options", "filter"]),
		...mapGetters("table", ["pages", "titles", "records"]),
	},
	async created() {
		this.isLoading = true;

		await this.loadInfoForTable();

		this.isLoading = false;

		if (this.$route.query.type) {
			this.changeAndSaveFilter({ type: this.$route.query.type, value: this.$route.query.value });
		} else {
			this.changeAndSaveFilter({ type: "", value: "" });
		}
	},
	methods: {
		...mapMutations("table", ["changeActivePage", "changeFilter", "changeCountOnPage"]),
		...mapActions("table", ["loadInfoForTable"]),
		changeAndSaveFilter(filter) {
			this.changeFilter(filter);

			if (filter.type) {
				this.$router.push({ query: { type: filter.type, value: filter.value } });
			}
		},
	},
};
</script>

<style scoped>
h1 {
	margin: 30px 0;
}
</style>
