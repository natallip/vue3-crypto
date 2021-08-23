<template>
	<div class="container">
		<add-ticker></add-ticker>
		<hr v-if="tickers?.length" />
		<list-tickers></list-tickers>
		<hr v-if="tickers?.length" />
		<graph-for-price v-if="selectedTicker"></graph-for-price>
	</div>
</template>

<script>
import AddTicker from "@/components/AddTicker";
import ListTickers from "@/components/ListTickers.vue";
import GraphForPrice from "@/components/GraphForPrice.vue";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
	components: {
		AddTicker,
		ListTickers,
		GraphForPrice,
	},
	computed: {
		...mapState("tickers", ["tickers", "selectedTicker"]),
	},
	async created() {
		const tickersData = window.localStorage.getItem("crypto-tickers");
		if (tickersData !== "undefined") {
			JSON.parse(tickersData).forEach((t) => {
				const newTicker = {
					name: t,
					price: "-",
				};
				this.addTicker(newTicker);
			});
			setInterval(async () => {
				await this.subscribeToUpdate();
			}, 5000);
		}
	},
	methods: {
		...mapMutations("tickers", ["addTicker"]),
		...mapActions("tickers", ["subscribeToUpdate"]),
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

#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #555;
}

#nav a.router-link-exact-active {
	color: #555;
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
