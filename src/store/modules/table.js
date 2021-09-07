import { loadInfoForTable } from "@/services/loadCoinsLast24hours";
import { normalizeName } from "@/utils/normalizeName";

export const table = {
	namespaced: true,
	state: {
		tableRecords: [],
		filter: {
			type: "",
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
			console.log(222, obj);
			state.filter = obj;
			state.activePage = 1;
			// console.log(111, state.filter);
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
