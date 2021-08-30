<template>
	<div class="container">
		<nav>
			<router-link to="/selectTickers">select tickers</router-link>
		</nav>
		<h1>Top coins by their total volume across all markets in the last 24 hours</h1>
		<table-with-filter-and-pagination
			:options="options"
			:titles="titles"
			:records="records"
			:pages="pages"
			:activePage="activePage"
			:value="filter.value"
			@click="changeActivePage($event)"
			@filter="changeFilter($event)"
		/>
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import TableWithFilterAndPagination from "@/components/table/TableWithFilterAndPagination.vue";

export default {
	name: "Home",
	components: { TableWithFilterAndPagination },
	computed: {
		...mapState("table", ["activePage", "tableRecords", "options", "filter"]),
		...mapGetters("table", ["pages", "titles", "records", "filteredRecords"]),
	},
	async created() {
		await this.loadInfoForTable();
	},
	methods: {
		...mapMutations("table", ["changeActivePage", "changeFilter"]),
		...mapActions("table", ["loadInfoForTable"]),
	},
};
</script>

<style scoped>
h1 {
	margin: 50px 0;
}
</style>
