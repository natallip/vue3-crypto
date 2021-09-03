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
import AppButton from "@/components/UI/AppButton.vue";

export default {
	components: { AppButton },
	props: {
		pages: Number,
		activePage: Number,
	},
	emits: {
		click: null,
	},
	computed: {
		hasNextPage() {
			return this.activePage < this.pages;
		},
	},
	methods: {
		isActive(page) {
			return page === this.activePage;
		},
	},
};
</script>

<style>
.pagination {
	margin: 30px 0;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
