import { subscribeToUpdate } from "@/services/updateTickers";
import { MIN_COLS_IN_GRAPH, MAX_COLS_IN_GRAPH } from "@/constants/index";
import moment from "moment";

export const graph = {
	namespaced: true,
	state: {
		type: "area",
		colors: undefined,
		series: [],
		xaxis: [],
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
				type: "category",
				categories: [],
				min: MIN_COLS_IN_GRAPH,
				max: MAX_COLS_IN_GRAPH,
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
		limitedXaxis(state) {
			let limited = [...state.xaxis];

			if (state.xaxis?.length > MAX_COLS_IN_GRAPH) {
				limited = limited.slice(-MAX_COLS_IN_GRAPH);
			}
			return limited || [];
		},
		options(state, getters) {
			state.options.colors = state.colors;

			return {
				...state.options,
				...{
					xaxis: {
						type: "category",
						categories: [...getters.limitedXaxis],
						min: MIN_COLS_IN_GRAPH,
						max: MAX_COLS_IN_GRAPH,
					},
				},
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
			state.series = [...state.series, { name: tickerName, data: [] }];
			// if (state.series[0]?.data.length > 1) {
			// 	state.series = [
			// 		...state.series,
			// 		{ name: tickerName, data: new Array(state.series[0].data.length) },
			// 	];
			// 	return;
			// } else {
			// 	state.series = [...state.series, { name: tickerName, data: [] }];
			// }
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
			state.xaxis = [...state.xaxis, moment().format("hh:mm:ss")];
		},
		removeSeries(state, tickerName) {
			state.series = state.series.filter((s) => s.name !== tickerName);
		},
		clearGraph(state) {
			state.series = [];
			state.xaxis = [];
			state.colors = undefined;
			state.type = "area";
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
