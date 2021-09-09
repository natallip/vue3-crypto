import { loadCoinInfo } from "@/services/loadCoinsLast24hours";
import { normalizeName } from "@/utils/normalizeName";

export const table = {
	namespaced: true,
	state: {
		tableRecords: [],
		titles: [
			{ name: "Image", type: "image", title: true },
			{ name: "Name", type: "name", title: true },
			{ name: "Full Name", type: "fullName", title: true },
			{ name: "Price", type: "price", title: true },
			{ name: "High Day", type: "highDay", title: true },
			{ name: "Low Day", type: "lowDay", title: true },
			{ name: "Change Day", type: "changeDay", title: true },
		],
		filter: {
			type: "",
			value: "",
		},
		count: 10,
		activePage: 1,
		options: ["", "name", "fullName"],
	},
	getters: {
		filteredRecords(state) {
			if (!state.filter.type) {
				return state.tableRecords;
			}

			if (!state.filter.value) {
				return state.tableRecords;
			}

			return [...state.tableRecords].filter((item) => {
				return normalizeName(item[state.filter.type]).includes(normalizeName(state.filter.value));
			});
		},
		records(state, getters) {
			if (state.count === "all") {
				return getters.filteredRecords;
			}

			const start = (state.activePage - 1) * +state.count;
			const end = state.activePage * +state.count;

			return getters.filteredRecords.slice(start, end);
		},
		pages(state, getters) {
			return Math.ceil(getters.filteredRecords.length / state.count) || 0;
		},
	},
	mutations: {
		setCoinInfo(state, data) {
			state.tableRecords = data;
		},
		changeActivePage(state, number) {
			state.activePage = number;
		},
		changeFilter(state, obj) {
			state.filter = obj;
			state.activePage = 1;
		},
		changeCountOnPage(state, value) {
			state.count = value;
			state.activePage = 1;
		},
	},
	actions: {
		async loadCoinInfo({ commit }, tickersNames) {
			const data = await loadCoinInfo(tickersNames);

			commit("setCoinInfo", data);
		},
	},
};
