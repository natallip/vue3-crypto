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
			<app-button type="close" @close="closeGraph" />
		</div>
	</div>
</template>

<script>
import AppButton from "./UI/AppButton.vue";
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
	name: "GraphForPrice",
	data() {
		return {
			graph: [],
		};
	},
	components: { AppButton },
	computed: {
		...mapState("tickers", ["selectedTicker"]),
		...mapGetters("graph", ["graphPrice"]),
	},
	methods: {
		...mapMutations("tickers", ["setSelectedTicker"]),
		closeGraph() {
			this.setSelectedTicker(null);
		},
		normalizeGraph() {
			const maxValue = Math.max(...this.graph);
			const minValue = Math.min(...this.graph);
			return this.graph.map((item) => {
				return 5 + ((item - minValue) * 95) / (maxValue - minValue) || 5;
			});
		},
	},
	watch: {
		selectedTicker() {
			this.graph = [];
			this.normalizeGraph();
		},
		graphPrice(value) {
			this.graph.push(value);
			if (this.graph.length > 20) this.graph.shift();
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
