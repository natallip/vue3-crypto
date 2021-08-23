export const graph = {
	namespaced: true,
	state: {
		graph: [],
	},
	getters: {
		graphPrice(state, getters, rootState) {
			const selectedTicker = rootState.tickers.tickers.find(
				(t) => t.name === rootState.tickers.selectedTicker
			);
			return selectedTicker?.price;
		},
	},
};
