import { MAX_COLS_IN_GRAPH } from "@/constants/index";
import { subscribeToUpdate } from "@/services/updateTickers";
import moment from "moment";

export const graph = {
	namespaced: true,
	state: {
		series: [],
		xaxis: [],
	},
	getters: {
		limitedSeries(state) {
			return (
				state.series?.map((s) => {
					if (s && s.data?.length > MAX_COLS_IN_GRAPH) {
						s.data.shift();
					}

					return s;
				}) || []
			);
		},
		limitedXaxis(state) {
			if (state.xaxis?.length > MAX_COLS_IN_GRAPH) {
				state.xaxis.shift();
			}

			return state.xaxis;
		},
	},
	mutations: {
		addTickerInGraph(state, tickerName) {
			state.series = [...state.series, { name: tickerName, data: [] }];
		},
		updateSeries(state, [tickerName, newPrice]) {
			state.series.map((t) => {
				if (t?.name === tickerName) {
					t.data = [...t.data, newPrice];

					return t;
				}
			});
		},
		updateXaxis(state) {
			state.xaxis = [...state.xaxis, moment().format("hh:mm")];
		},
		removeSeries(state, tickerName) {
			state.series = state.series.filter((s) => s.name !== tickerName);
		},
		clearGraph(state) {
			state.series = [];
			state.xaxis = [];
		},
	},
	actions: {
		async setSeries({ commit }, tickerName) {
			commit("addTickerInGraph", tickerName);

			await subscribeToUpdate(tickerName, (newPrice) => {
				commit("updateSeries", [tickerName, newPrice]);
				commit("updateXaxis");
			});
		},
	},
};
