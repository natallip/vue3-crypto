import { loadInfoForTable } from "@/services/loadCoinsLast24hours";
import { normalizeName } from "@/utils/normalizeName";

export const table = {
	namespaced: true,
	state: {
		tableRecords: [],
		filter: {
			type: null,
			value: "",
		},
		count: 10,
		activePage: 1,
		options: ["name", "fullName"],
	},
	getters: {
		titles(state) {
			if (state.tableRecords[0]) {
				return Object.keys(state.tableRecords[0]);
			}
		},
		filteredRecords(state) {
			if (!state.filter.value) {
				return state.tableRecords;
			}

			return [...state.tableRecords].filter((item) => {
				return item[state.filter.type].includes(normalizeName(state.filter.value));
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
			return Math.ceil(getters.filteredRecords.length / state.count);
		},
	},
	mutations: {
		setInfoForTable(state, data) {
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
		async loadInfoForTable({ commit }, tickersNames) {
			const data = await loadInfoForTable(tickersNames);

			commit("setInfoForTable", data);
		},
	},
};
