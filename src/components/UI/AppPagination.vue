<template>
	<div class="pagination">
		<app-button
			v-if="activePage > 1"
			type="pagination"
			text="prev"
			@click="changeActivePage(activePage - 1)"
		/>
		<app-button
			v-if="hasNextPage"
			type="pagination"
			text="next"
			@click="changeActivePage(activePage + 1)"
		/>
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import AppButton from "./AppButton.vue";

export default {
	name: "Pagination",
	components: { AppButton },
	computed: {
		...mapState("table", ["activePage"]),
		...mapGetters("table", ["hasNextPage"]),
	},
	methods: {
		...mapMutations("table", ["changeActivePage"]),
	},
};
</script>

<style>
.pagination {
	margin: 50px 0;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
