import { loadAviableTickers } from "../../services/loadAvaibleTickers";
import { loadTickers } from "../../services/loadTickers";

export const tickers = {
	namespaced: true,
	state: {
		tickers: [],
		avaibleTickers: [],
		selectedTicker: null,
	},
	getters: {
		tickersNames(state) {
			return state.tickers?.map((t) => t.name);
		},
	},
	mutations: {
		addTicker(state, ticker) {
			if (!state.tickers) {
				state.tickers = [];
			}
			state.tickers.push(ticker);
		},
		deleteTicker(state, name) {
			state.tickers = state.tickers.filter((t) => t.name !== name);
		},
		updateTicker(state, ticker) {
			const ind = state.tickers.findIndex((t) => t.name === ticker.name);
			if (state.tickers[ind]) {
				state.tickers[ind].price = ticker.price;
			}
		},
		updateTickers(state, tickers) {
			state.tickers = tickers;
		},
		setSelectedTicker(state, ticker) {
			state.selectedTicker = ticker;
		},
		setAvaibleTickers(state, tickers) {
			state.avaibleTickers = tickers;
		},
	},
	actions: {
		async loadAvaibleTickers({ commit }) {
			const tickers = await loadAviableTickers();
			commit("setAvaibleTickers", tickers);
		},
		async subscribeToUpdate({ commit, getters: { tickersNames } }) {
			if (!tickersNames) {
				return;
			}
			const tickers = await loadTickers(tickersNames);
			commit("updateTickers", tickers);
		},
	},
};
