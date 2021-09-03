<template>
	<app-nav />
	<div class="container">
		<h1>Top coins by their total volume across all markets in the last 24 hours</h1>
		<app-loader v-if="isLoading" />
		<table-with-filter-and-pagination
			:options="options"
			:titles="titles"
			:records="records"
			:pages="pages"
			:activePage="activePage"
			:value="filter.value"
			@click="changeActivePage($event)"
			@filter="changeFilter($event)"
			@change="changeCountOnPage($event.target.value)"
		/>
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import TableWithFilterAndPagination from "@/components/table/TableWithFilterAndPagination.vue";
import AppLoader from "@/components/UI/AppLoader.vue";
import AppNav from "@/components/UI/AppNav.vue";

export default {
	name: "Home",
	components: { TableWithFilterAndPagination, AppLoader, AppNav },
	computed: {
		...mapState("table", ["activePage", "tableRecords", "options", "filter"]),
		...mapGetters("table", ["pages", "titles", "records", "filteredRecords"]),
		isLoading() {
			return !this.records.length;
		},
	},
	async created() {
		await this.loadInfoForTable();
	},
	methods: {
		...mapMutations("table", ["changeActivePage", "changeFilter", "changeCountOnPage"]),
		...mapActions("table", ["loadInfoForTable"]),
	},
};
</script>

<style scoped>
h1 {
	margin: 30px 0;
}
</style>
