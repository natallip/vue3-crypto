<template>
	<div class="graph">
		<h2 class="graph-name">{{ selectedTickerName }} - USD</h2>
		<ul class="graph-list">
			<li
				v-for="(bar, ind) in normalizeGraph()"
				:key="ind"
				class="graph-item"
				:style="{ height: `${bar}%` }"
			></li>
		</ul>
		<div class="graph-close">
			<app-button type="primary" icon="close" @click="closeGraph" />
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import AppButton from "@/components/UI/AppButton.vue";
import { MIN_HEIGHT_GRAPH } from "@/constants/index";

export default {
	components: { AppButton },
	computed: {
		...mapState("tickers", ["selectedTickerName"]),
		...mapGetters("graph", ["limitedGraph"]),
	},
	methods: {
		...mapMutations("tickers", ["setSelectedTicker"]),
		...mapMutations("graph", ["clearGraph"]),
		closeGraph() {
			this.setSelectedTicker(null);
			this.clearGraph();
		},
		normalizeGraph() {
			const maxValue = Math.max(...this.limitedGraph);
			const minValue = Math.min(...this.limitedGraph);

			const graph = this.limitedGraph.map((item) => {
				return (
					MIN_HEIGHT_GRAPH + ((item - minValue) * (100 - MIN_HEIGHT_GRAPH)) / (maxValue - minValue)
				);
			});

			return graph;
		},
	},
};
</script>

<style scoped>
.graph {
	position: relative;
	margin-top: 30px;
	border-bottom: 1px solid #555;
	border-left: 1px solid #555;
}
.graph-name {
	text-align: left;
	margin-left: 10px;
}
.graph-list {
	list-style: none;
	display: flex;
	align-items: flex-end;
	width: 100%;
	height: 200px;
	margin: 0;
	padding: 0;
}
.graph-item {
	background: #4e0281;
	width: 40px;
	height: 150px;
	margin-right: 3px;
}
.graph-close {
	position: absolute;
	top: 0;
	right: 0;
}
</style>
