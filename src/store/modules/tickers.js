import { loadAvailableTickers } from "../../services/loadAvailableTickers";
import { loadTickers } from "../../services/loadTickers";

export const tickers = {
	namespaced: true,
	state: {
		tickerName: "",
		tickers: [],
		availableTickers: [],
		selectedTicker: null,
	},
	getters: {
		tickersNames(state) {
			return state.tickers?.map((t) => t.name) || [];
		},
		tickers(state) {
			return state.tickers || [];
		},
	},
	mutations: {
		changeTickerName(state, name) {
			state.tickerName = name;
		},
		addTicker(state, ticker) {
			if (!state.tickers) {
				state.tickers = [];
			}

			state.tickers = [...state.tickers, ticker];
		},
		deleteTicker(state, name) {
			state.tickers = state.tickers.filter((t) => t.name !== name);
		},
		updateTicker(state, ticker) {
			const ind = state.tickers.findIndex((t) => t.name === ticker.name);

			state.tickers[ind].price = ticker.price;
		},
		updateTickers(state, tickers) {
			state.tickers = tickers;
		},
		setSelectedTicker(state, ticker) {
			state.selectedTicker = ticker;
		},
		setAvailableTickers(state, tickers) {
			state.availableTickers = tickers;
		},
	},
	actions: {
		async loadAvailableTickers({ commit }) {
			const tickers = await loadAvailableTickers();

			commit("setAvailableTickers", tickers);
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
