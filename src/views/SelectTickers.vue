<template>
	<svg-sprite />
	<div class="container">
		<nav>
			<router-link to="/">top coins</router-link>
		</nav>
		<add-ticker />
		<hr v-if="isEmpty" />
		<list-tickers />
		<hr v-if="isEmpty" />
		<app-graph v-if="isSelected" />
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import AddTicker from "@/components/tickers/AddTicker";
import ListTickers from "@/components/tickers/ListTickers.vue";
import AppGraph from "@/components/UI/AppGraph.vue";
import SvgSprite from "@/components/UI/SvgSprite.vue";
import { getFromLocalStorage } from "@/services/savingDataInLS";

export default {
	components: {
		AddTicker,
		ListTickers,
		AppGraph,
		SvgSprite,
	},
	computed: {
		...mapGetters("tickers", ["tickers"]),
		...mapGetters("graph", ["limitedSeries"]),
		isEmpty() {
			return this.tickers.length;
		},
		isSelected() {
			return this.limitedSeries.length;
		},
	},
	created() {
		let savingTickers = getFromLocalStorage();

		savingTickers.forEach(async (t) => {
			this.addTicker(t);
			await this.subscribeToUpdate(t.name);
		});
	},
	methods: {
		...mapMutations("tickers", [
			"addTicker",
			"updateTickers",
			"changeTickerName",
			"setPossibleTickers",
		]),
		...mapActions("tickers", ["subscribeToUpdate", "loadAvailableTickers"]),
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
.container {
	max-width: 1200px;
	width: 90%;
	margin: 0 auto;
}
hr {
	margin: 20px 0;
}
</style>
