<template>
	<app-filter :options="options" :value="value" @filter="$emit('filter', $event)" />
	<app-table :titles="titles" :records="records" />
	<app-pagination :pages="pages" :activePage="activePage" @click="$emit('click', $event)" />
</template>

<script>
import AppPagination from "@/components/UI/AppPagination.vue";
import AppTable from "@/components/table/AppTable.vue";
import AppFilter from "@/components/UI/AppFilter.vue";

export default {
	name: "TableWithFilterAndPagination",
	components: { AppFilter, AppTable, AppPagination },
	props: {
		titles: Array,
		records: Array,
		pages: Number,
		activePage: Number,
		options: Array,
		value: [String, Number],
	},
	emits: {
		click: null,
		filter: null,
	},
};
</script>

<style></style>
