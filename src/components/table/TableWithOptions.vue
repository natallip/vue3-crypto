<template>
	<app-filter
		v-if="hasFilter"
		:options="options"
		:filterParams="filter"
		@filter="$emit('filter', $event)"
	/>
	<div class="table">
		<div class="thead">
			<div class="tr">
				<app-cell
					v-for="(item, i) in titles"
					:key="i"
					:text="item.name"
					:type="item.type"
					:title="item.title"
				/>
			</div>
		</div>
		<div class="tbody">
			<router-link class="row" v-for="(item, i) in records" :key="i" :to="link(item.name)">
				<div class="tr">
					<app-cell
						v-for="(val, key, i) in item"
						:key="i"
						:type="key"
						:text="val"
						:src="val"
						:alt="item.name"
					/>
				</div>
			</router-link>
			<div v-if="isEmpty" class="tr tr--empty">
				<app-cell text="No records" />
			</div>
		</div>
	</div>
	<app-pagination-with-option
		v-if="hasPagination"
		:pages="pages"
		:activePage="activePage"
		@click="$emit('click', $event)"
		@change="$emit('change', $event)"
	/>
</template>

<script>
import AppPaginationWithOption from "@/components/UI/AppPaginationWithOption.vue";
import AppFilter from "@/components/UI/AppFilter.vue";
import AppCell from "@/components/table/AppCell.vue";
import { SINGLE_TICKER } from "@/router/constants";

export default {
	components: { AppFilter, AppPaginationWithOption, AppCell },
	props: {
		titles: Array,
		records: Array,
		pages: Number,
		activePage: Number,
		options: Array,
		filter: Object,
		hasFilter: Boolean,
		hasPagination: Boolean,
	},
	emits: {
		click: null,
		change: null,
		filter: null,
	},
	computed: {
		isEmpty() {
			return !this.records.length;
		},
	},
	methods: {
		link(name) {
			return `${SINGLE_TICKER}/${name}`;
		},
	},
};
</script>

<style>
.table {
	margin: 20px auto;
}
.tr {
	display: flex;
	flex-shrink: 0;
	flex-grow: 0;
	width: 1200px;
}
.tr--empty {
	justify-content: center;
}
.thead {
	background: #4e0281;
	color: #fff;
	width: 1200px;
}
.row:nth-of-type(2n) .tr {
	background: #e9e9e9;
}
</style>
