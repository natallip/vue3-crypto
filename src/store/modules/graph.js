import { MAX_COLS_IN_GRAPH } from "../../constants/index";

export const graph = {
	namespaced: true,
	state: {
		graph: [],
	},
	getters: {
		limitedGraph(state) {
			if (state.graph.length > MAX_COLS_IN_GRAPH) {
				state.graph.shift();
			}
			return state.graph;
		},
	},
	mutations: {
		updateGraph(state, newPrice) {
			state.graph = [...state.graph, newPrice];
		},
		clearGraph(state) {
			state.graph = [];
		},
	},
};
