<template>
	<table>
		<thead>
			<tr>
				<app-cell v-for="(title, i) in titles" :key="i" type="title" :text="title" />
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, i) in records" :key="i">
				<app-cell
					v-for="(val, key, i) in item"
					:key="i"
					:type="key"
					:text="val"
					:src="val"
					:alt="item.name"
					:name="isName(key)"
					:tickerName="item['name']"
				/>
			</tr>
			<tr v-if="isEmpty">
				<app-cell text="No records" :colspan="titles?.length" />
			</tr>
		</tbody>
	</table>
</template>

<script>
import AppCell from "./AppCell.vue";

export default {
	components: { AppCell },
	props: {
		titles: Array,
		records: Array,
	},
	computed: {
		isEmpty() {
			return !this.records.length;
		},
	},
	methods: {
		isName(value) {
			return value === "fullName";
		},
	},
};
</script>

<style>
table {
	border-collapse: collapse;
	margin: 20px auto;
}
tr:nth-child(2n) {
	background: #e9e9e9;
}
</style>
