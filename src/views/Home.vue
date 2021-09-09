<template>
	<main-layout>
		<h1>Top coins by their total volume across all markets in the last 24 hours</h1>
		<app-loader v-if="isLoading" />
		<table-with-options
			:hasFilter="true"
			:hasPagination="true"
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
	</main-layout>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import TableWithOptions from "@/components/table/TableWithOptions.vue";
import AppLoader from "@/components/UI/AppLoader.vue";
import MainLayout from "@/layouts/mainLayout.vue";

export default {
	data() {
		return {
			isLoading: false,
		};
	},
	components: { TableWithOptions, AppLoader, MainLayout },
	computed: {
		...mapState("table", ["titles", "activePage", "options", "filter"]),
		...mapGetters("table", ["pages", "records"]),
	},
	async created() {
		this.isLoading = true;

		await this.loadCoinInfo();

		this.isLoading = false;

		const { type, value } = this.$route.query;

		if (type) {
			this.changeAndSaveFilter({ type, value });
		}
	},
	methods: {
		...mapMutations("table", ["changeActivePage", "changeFilter", "changeCountOnPage"]),
		...mapActions("table", ["loadCoinInfo"]),
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
