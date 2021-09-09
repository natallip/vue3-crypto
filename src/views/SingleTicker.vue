<template>
	<main-layout>
		<h1>{{ tickerName }}</h1>
		<graph-with-opions />
	</main-layout>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import GraphWithOpions from "@/components/graph/GraphWithOpions";
import MainLayout from "@/layouts/mainLayout.vue";

export default {
	components: { GraphWithOpions, MainLayout },
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
