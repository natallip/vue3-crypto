import axios from "axios";
import { createStore } from "vuex";
import { loadTickers } from "../api";
import config from "../config.json";

export default createStore({
	state: {
		tickers: [],
		avaibleTickers: [],
		selectedTicker: null,
		graph: [],
	},
	getters: {
		tickersNames(state) {
			return state.tickers?.map((t) => t.name);
		},
		graphPrice(state) {
			const selectedTicker = state.tickers.find(
				(t) => t.name === state.selectedTicker
			);
			return selectedTicker?.price;
		},
	},
	mutations: {
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
		setAvaibleTickers(state, tickers) {
			state.avaibleTickers = tickers;
		},
	},
	actions: {
		async loadAvaibleTickers({ commit }) {
			const response = await axios.get(config.URL_COINS);
			const data = await response.data.Data;
			const tickers = Object.keys(data);
			commit("setAvaibleTickers", tickers);
		},
		subscribeToUpdate(context) {
			setInterval(async () => {
				const tickers = await loadTickers(context.getters.tickersNames);
				context.commit("updateTickers", tickers);
			}, 3000);
		},
	},
});
