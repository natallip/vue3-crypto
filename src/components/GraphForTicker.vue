<template>
	<div class="graph">
		<h2 class="graph-name">{{ selectedTicker }} - USD</h2>
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
import AppButton from "./UI/AppButton.vue";
import { MIN_HEIGHT_GRAPH, MAX_COLS_IN_GRAPH } from "../constants/index";

export default {
	name: "GraphForTicker",
	data() {
		return {
			graph: [],
		};
	},
	components: { AppButton },
	computed: {
		...mapState("tickers", ["selectedTicker"]),
		...mapGetters("tickers", ["tickers"]),
		price() {
			const selectedTicker = this.tickers.find((t) => t.name === this.selectedTicker);

			return selectedTicker?.price;
		},
	},
	methods: {
		...mapMutations("tickers", ["setSelectedTicker"]),
		closeGraph() {
			this.setSelectedTicker(null);
			this.graph = [];
		},
		normalizeGraph() {
			const maxValue = Math.max(...this.graph);
			const minValue = Math.min(...this.graph);

			let graph = this.graph.map((item) => {
				return (
					MIN_HEIGHT_GRAPH +
						((item - minValue) * (100 - MIN_HEIGHT_GRAPH)) / (maxValue - minValue) ||
					MIN_HEIGHT_GRAPH
				);
			});

			if (graph.length > MAX_COLS_IN_GRAPH) {
				graph = graph.shift();
			}

			return graph;
		},
	},
	watch: {
		selectedTicker() {
			this.graph = [];
		},
		price(value) {
			this.graph.push(value);
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
