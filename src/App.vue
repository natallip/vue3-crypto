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
import { mapActions, mapMutations, mapState } from "vuex";

export default {
	components: {
		AddTicker,
		ListTickers,
		GraphForPrice,
	},
	computed: {
		...mapState(["tickers", "selectedTicker"]),
	},
	async created() {
		const tickersData = localStorage.getItem("crypto-tickers");
		if (tickersData) {
			JSON.parse(tickersData).forEach((t) => {
				const newTicker = {
					name: t,
					price: "-",
				};
				this.addTicker(newTicker);
			});
			await this.subscribeToUpdate();
		}
	},
	methods: {
		...mapMutations(["addTicker"]),
		...mapActions(["subscribeToUpdate"]),
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
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
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
