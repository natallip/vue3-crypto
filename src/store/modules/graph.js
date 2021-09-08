import { subscribeToUpdate } from "@/services/updateTickers";
import { MAX_COLS_IN_GRAPH } from "@/constants/index";

export const graph = {
	namespaced: true,
	state: {
		types: ["area", "line", "bar"],
		type: "area",
		colors: undefined,
		series: [],
		options: {
			chart: {
				id: "realtime",
				animations: {
					enabled: true,
					easing: "linear",
					dynamicAnimation: {
						speed: 1000,
					},
				},
				toolbar: {
					show: false,
				},
				zoom: {
					enabled: false,
				},
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: "smooth",
			},
			title: {
				text: "Dynamic Updating Chart",
				align: "center",
			},
			xaxis: {
				type: "datetime",
			},
		},
	},
	getters: {
		limitedSeries(state) {
			return (
				[...state.series].map((s) => {
					if (s.data?.length > MAX_COLS_IN_GRAPH) {
						s.data = s.data.slice(-MAX_COLS_IN_GRAPH);
					}

					return s;
				}) || []
			);
		},
		options(state) {
			state.options.colors = state.colors;

			return {
				...state.options,
			};
		},
	},
	mutations: {
		changeType(state, type) {
			state.type = type;
		},
		changeColor(state, color) {
			state.colors = [color];
		},
		addTickerInGraph(state, tickerName) {
			let item = [...state.series].find((s) => s.name === tickerName);

			if (item) {
				return;
			}

			state.series = [...state.series, { name: tickerName, data: [[new Date(), 0]] }];
		},
		updateSeries(state, [tickerName, newPrice]) {
			state.series.map((t) => {
				if (t?.name === tickerName) {
					t.data = [...t.data, [new Date(), newPrice]];

					return t;
				}
			});
		},
		removeSeries(state, tickerName) {
			state.series = state.series.filter((s) => s.name !== tickerName);
		},
		clearGraph(state) {
			state.series = [];
			state.colors = undefined;
			state.type = "area";
		},
	},
	actions: {
		async setSeries({ commit }, tickerName) {
			commit("addTickerInGraph", tickerName);

			await subscribeToUpdate(tickerName, (newPrice) => {
				commit("updateSeries", [tickerName, newPrice]);
			});
		},
	},
};
