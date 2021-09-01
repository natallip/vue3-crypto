<template>
	<h1>{{ tickerName }}</h1>
	<app-graph :series="limitedSeries" :xaxis="limitedXaxis" />
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import AppGraph from "@/components/UI/AppGraph.vue";

export default {
	components: { AppGraph },
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
		...mapMutations("graph", ["clearGraph"]),
		...mapActions("graph", ["setSeries"]),
	},
	unmounted() {
		this.clearGraph();
	},
};
</script>

<style></style>
