import { loadAvailableTickers } from "@/services/loadAvailableTickers";
import { subscribeToUpdate, unsubscribeToUpdate } from "@/services/updateTickers";

export const tickers = {
	namespaced: true,
	state: {
		tickerName: "",
		tickers: [],
		availableTickers: [],
		//selectedTickerName: "",
		selectedTickers: [],
	},
	getters: {
		tickersNames(state) {
			return state.tickers?.map((t) => t.name) || [];
		},
		tickers(state) {
			return state.tickers || [];
		},
		availableTickers(state) {
			return state.availableTickers || [];
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
		updatePrice(state, data) {
			const ind = state.tickers.findIndex((t) => t.name === data[0]);

			if (state.tickers[ind]) {
				state.tickers[ind].price = data[1];
			}
		},
		// setSelectedTickerName(state, tickerName) {
		// 	state.selectedTickerName = tickerName;
		// },
		setSelectedTickers(state, tickerName) {
			state.selectedTickers = [...state.selectedTickers, tickerName];
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
		async subscribeToUpdate({ commit }, tickerName) {
			await subscribeToUpdate(tickerName, (newPrice) => {
				commit("updatePrice", [tickerName, newPrice]);
			});
		},
		async unsubscribeToUpdate({ commit }, tickerName) {
			await unsubscribeToUpdate(tickerName);

			commit("deleteTicker", tickerName);
		},
		// async setSelectedTickers({ commit }, tickerName) {
		// 	commit("setSelectedTickers", tickerName);

		// 	await subscribeToUpdate(tickerName, (newPrice) => {
		// 		commit("graph/updateGraph", newPrice, { root: true });
		// 	});
		// },
	},
};
