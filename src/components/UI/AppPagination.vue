<template>
	<div class="pagination">
		<app-button
			v-if="activePage > 1"
			type="pagination"
			text="prev"
			@click="$emit('click', activePage - 1)"
		/>
		<app-button
			v-for="page in pages"
			type="pagination"
			:key="page"
			:text="page"
			:class="{ 'button--active': isActive(page) }"
			@click="$emit('click', page)"
		/>
		<app-button
			v-if="hasNextPage"
			type="pagination"
			text="next"
			@click="$emit('click', activePage + 1)"
		/>
	</div>
</template>

<script>
import AppButton from "./AppButton.vue";

export default {
	name: "Pagination",
	components: { AppButton },
	props: {
		pages: Number,
		activePage: Number,
	},
	emit: {
		click: null,
	},
	computed: {
		hasNextPage() {
			return this.activePage < this.pages;
		},
		// ...mapState("table", ["activePage"]),
		// ...mapGetters("table", ["hasNextPage"]),
	},
	methods: {
		// ...mapMutations("table", ["changeActivePage"]),
		isActive(page) {
			return page === this.activePage;
		},
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
