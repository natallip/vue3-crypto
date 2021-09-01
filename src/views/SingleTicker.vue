<template>
	<h1>{{ tickerName }}</h1>
	<graph :series="limitedSeries" :xaxis="limitedXaxis" />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Graph from "../components/tickers/Graph.vue";

export default {
	components: { Graph },
	computed: {
		...mapGetters("graph", ["limitedSeries", "limitedXaxis"]),
		tickerName() {
			return this.$route.params.id;
		},
	},
	created() {
		this.setSeries(this.tickerName);
	},
	methods: {
		...mapActions("graph", ["setSeries"]),
	},
};
</script>

<style></style>
