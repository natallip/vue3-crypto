<template>
	<app-filter :options="options" :filterParams="filter" @filter="$emit('filter', $event)" />
	<app-table :titles="titles" :records="records" />
	<app-pagination-with-option
		:pages="pages"
		:activePage="activePage"
		@click="$emit('click', $event)"
		@change="$emit('change', $event)"
	/>
</template>

<script>
import AppPaginationWithOption from "@/components/UI/AppPaginationWithOption.vue";
import AppTable from "@/components/table/AppTable.vue";
import AppFilter from "@/components/UI/AppFilter.vue";

export default {
	components: { AppFilter, AppTable, AppPaginationWithOption },
	props: {
		titles: Array,
		records: Array,
		pages: Number,
		activePage: Number,
		options: Array,
		filter: Object,
	},
	emits: {
		click: null,
		change: null,
		filter: null,
	},
};
</script>
