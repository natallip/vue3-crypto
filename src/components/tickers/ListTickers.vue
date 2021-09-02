<template>
	<ul class="tickers">
		<li
			v-for="ticker in tickers"
			class="tickers__item"
			:key="ticker"
			:class="{ active: isSelected(ticker.name) }"
			@click="setSeries(ticker.name)"
		>
			<app-ticker :ticker="ticker" @delete="remove" />
		</li>
	</ul>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import AppTicker from "./AppTicker.vue";

export default {
	components: { AppTicker },
	computed: {
		...mapGetters("tickers", ["tickers"]),
		...mapGetters("graph", ["limitedSeries"]),
	},
	methods: {
		...mapMutations("tickers", ["deleteTicker"]),
		...mapMutations("graph", ["removeSeries", "clearGraph"]),
		...mapActions("graph", ["setSeries"]),
		remove(tickerName) {
			this.removeSeries(tickerName);

			this.deleteTicker(tickerName);
		},
		isSelected(tickerName) {
			return this.limitedSeries.find((t) => {
				return t.name === tickerName;
			});
		},
		unmounted() {
			this.clearGraph();
		},
	},
};
</script>

<style scoped>
.tickers {
	list-style: none;
	display: flex;
	flex-wrap: wrap;
	margin-left: -20px;
	margin-top: 30px;
	padding: 0;
}
.tickers__item {
	width: 30%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-left: 20px;
	margin-bottom: 30px;
	text-align: center;
	border-radius: 5px;
	cursor: pointer;
}
.tickers__item.active {
	box-shadow: 0 0 1px 3px #4e0281;
}
</style>
