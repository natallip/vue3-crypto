import { createStore } from "vuex";
import { loadTickers } from "../api";

export default createStore({
	state: {
		tickers: [],
		selectedTicker: null,
		graph: [],
	},
	getters: {
		tickersNames(state) {
			return state.tickers.map((t) => t.name);
		},
		graphPrice(state) {
			const selectedTicker = state.tickers.find(
				(t) => t.name === state.selectedTicker
			);
			return selectedTicker?.price;
		},
	},
	mutations: {
		setTickers(state, tickers) {
			state.tickers = tickers;
		},
		addTicker(state, ticker) {
			state.tickers = [...state.tickers, ticker];
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
	},
	actions: {
		subscribeToUpdate(context) {
			setInterval(async () => {
				const tickers = await loadTickers(context.getters.tickersNames);
				context.commit("updateTickers", tickers);
			}, 3000);
		},
	},
});
