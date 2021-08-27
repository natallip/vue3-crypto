<template>
	<div class="container">
		<nav>
			<router-link to="/selectTickers">select tickers</router-link>
		</nav>
		<h1>Top coins by their total volume across all markets in the last 24 hours</h1>
		<app-table />
		<app-pagination @click="changePage(page)" />
	</div>
</template>

<script>
import { mapMutations } from "vuex";
import AppTable from "@/components/AppTable.vue";
import AppPagination from "@/components/UI/AppPagination.vue";

export default {
	name: "Home",
	components: { AppTable, AppPagination },
	methods: {
		...mapMutations("table", ["changePage"]),
	},
};
</script>

<style scoped>
h1 {
	margin: 50px 0;
}
</style>
