<template>
	<div class="container">
		<h1>{{ tickerName }}</h1>
		<graph-with-opions />
	</div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import GraphWithOpions from "@/components/graph/GraphWithOpions";

export default {
	components: { GraphWithOpions },
	computed: {
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
