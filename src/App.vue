<template>
	<svg-sprite />
	<div class="container">
		<add-ticker />
		<hr v-if="isEmpty" />
		<list-tickers />
		<hr v-if="isEmpty" />
		<graph-for-ticker v-if="selectedTicker" />
	</div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import AddTicker from "@/components/AddTicker";
import ListTickers from "@/components/ListTickers.vue";
import GraphForTicker from "@/components/GraphForTicker.vue";
import SvgSprite from "./components/UI/SvgSprite.vue";

export default {
	components: {
		AddTicker,
		ListTickers,
		GraphForTicker,
		SvgSprite,
	},
	computed: {
		...mapState("tickers", ["selectedTicker"]),
		...mapGetters("tickers", ["tickers"]),
		isEmpty() {
			return this.tickers.length;
		},
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
