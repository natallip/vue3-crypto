<template>
	<table>
		<tr>
			<th v-for="(title, i) in tableColTitles" :key="i">
				<h2>{{ title }}</h2>
			</th>
		</tr>
		<tr v-for="(item, i) in recordsOnPage" :key="i">
			<td v-for="(val, key, i) in item" :key="i">
				<img v-if="key === 'image'" :src="val" :alt="item.name" class="table__img" />
				<p v-if="key !== 'image'">{{ val }}</p>
			</td>
		</tr>
	</table>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
	name: "Table",
	computed: {
		...mapState("table", ["tableRecords"]),
		...mapGetters("table", ["tableColTitles", "recordsOnPage"]),
	},
	async created() {
		await this.loadInfoForTable();
	},
	methods: {
		...mapActions("table", ["loadInfoForTable"]),
	},
};
</script>

<style>
table {
	border-collapse: collapse;
	margin: 50px auto;
}
tr:nth-child(2n) {
	background: #e9e9e9;
}
td,
th {
	vertical-align: middle;
	padding: 0 20px;
}
th {
	font-size: 0.6rem;
	text-transform: uppercase;
	padding: 5px 20px;
}
.table__img {
	width: 30px;
	height: 30px;
	object-fit: contain;
}
</style>
