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
		<div class="graph-close" @click="closeGraph">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				x="0px"
				y="0px"
				viewBox="0 0 511.76 511.76"
				style="enable-background: new 0 0 511.76 511.76"
				xml:space="preserve"
			>
				<g>
					<g>
						<path
							fill="#444"
							d="M436.896,74.869c-99.84-99.819-262.208-99.819-362.048,0c-99.797,99.819-99.797,262.229,0,362.048
							c49.92,49.899,115.477,74.837,181.035,74.837s131.093-24.939,181.013-74.837C536.715,337.099,536.715,174.688,436.896,74.869z
							M361.461,331.317c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251
							l-75.413-75.435l-75.392,75.413c-4.181,4.16-9.643,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251
							c-8.341-8.341-8.341-21.845,0-30.165l75.392-75.413l-75.413-75.413c-8.341-8.341-8.341-21.845,0-30.165
							c8.32-8.341,21.824-8.341,30.165,0l75.413,75.413l75.413-75.413c8.341-8.341,21.824-8.341,30.165,0
							c8.341,8.32,8.341,21.824,0,30.165l-75.413,75.413L361.461,331.317z"
						/>
					</g>
				</g>
			</svg>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
	name: "GraphForPrice",
	data() {
		return {
			graph: [],
		};
	},
	computed: {
		...mapState(["selectedTicker"]),
		...mapGetters(["graphPrice"]),
	},
	methods: {
		...mapMutations(["setSelectedTicker"]),
		closeGraph() {
			this.setSelectedTicker(null);
		},
		normalizeGraph() {
			const maxValue = Math.max(...this.graph);
			const minValue = Math.min(...this.graph);
			return this.graph.map((item) => {
				return 5 + ((item - minValue) * 95) / (maxValue - minValue);
			});
		},
	},
	watch: {
		selectedTicker() {
			this.graph = [];
		},
		graphPrice(newV) {
			this.graph.push(newV);
			if (this.graph.length > 20) this.graph.shift();
		},
	},
};
</script>

<style>
.graph {
	position: relative;
	margin-top: 30px;
	border-bottom: 1px solid #444;
	border-left: 1px solid #444;
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
	width: 50px;
	height: 150px;
	margin-right: 5px;
}
.graph-close {
	width: 20px;
	height: 20px;
	position: absolute;
	top: 0;
	right: 0;
	cursor: pointer;
}
</style>
