import { loadInfoForTable } from "@/services/loadCoinsLast24hours";
import { COUNT_RECORDS_ON_PAGE } from "@/constants/index";
import { normalizeName } from "@/utils/normalizeName";

export const table = {
	namespaced: true,
	state: {
		tableRecords: [],
		filter: {
			type: null,
			value: "",
		},
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
				return normalizeName(item[state.filter.type]).includes(normalizeName(state.filter.value));
			});
		},
		records(state, getters) {
			const start = (state.activePage - 1) * COUNT_RECORDS_ON_PAGE;
			const end = state.activePage * COUNT_RECORDS_ON_PAGE;

			return getters.filteredRecords.slice(start, end);
		},
		pages(state, getters) {
			return Math.ceil(getters.filteredRecords.length / COUNT_RECORDS_ON_PAGE);
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
	},
	actions: {
		async loadInfoForTable({ commit }, tickersNames) {
			const data = await loadInfoForTable(tickersNames);

			commit("setInfoForTable", data);
		},
	},
};
