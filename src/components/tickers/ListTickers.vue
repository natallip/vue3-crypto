<template>
	<ul class="tickers">
		<li
			v-for="ticker in tickers"
			class="tickers__item"
			:key="ticker"
			:class="{ active: isSelected(ticker.name) }"
			@click="setSelected(ticker.name)"
		>
			<app-ticker :ticker="ticker" @delete="remove" />
		</li>
	</ul>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import AppTicker from "./AppTicker.vue";

export default {
	components: { AppTicker },
	computed: {
		...mapState("tickers", ["selectedTickerName"]),
		...mapGetters("tickers", ["tickers"]),
	},
	methods: {
		...mapMutations("tickers", ["deleteTicker"]),
		...mapMutations("graph", ["clearGraph"]),
		...mapActions("tickers", ["setSelectedTicker"]),
		remove(name) {
			if (name === this.selectedTickerName) {
				this.setSelectedTicker(null);
				this.clearGraph();
			}

			this.deleteTicker(name);
		},
		isSelected(tickerName) {
			return this.selectedTickerName === tickerName;
		},
		async setSelected(tickerName) {
			await this.setSelectedTicker(tickerName);
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
	margin-top: 40px;
	padding: 0;
}
.tickers__item {
	width: 30%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-left: 20px;
	margin-bottom: 40px;
	text-align: center;
	border-radius: 5px;
	cursor: pointer;
}
.tickers__item.active {
	box-shadow: 0 0 1px 3px #4e0281;
}
</style>
