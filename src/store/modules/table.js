import { loadInfoForTable } from "../../services/loadInfoForTable";
import { COUNT_RECORDS_ON_PAGE } from "../../constants/index";

export const table = {
	namespaced: true,
	state: {
		tableRecords: [],
		activePage: 1,
	},
	getters: {
		tableColTitles(state) {
			if (state.tableRecords[0]) {
				return Object.keys(state.tableRecords[0]);
			}
		},
		recordsOnPage(state) {
			const start = (state.activePage - 1) * COUNT_RECORDS_ON_PAGE;
			const end = state.activePage * COUNT_RECORDS_ON_PAGE;

			return [...state.tableRecords].slice(start, end);
		},
		hasNextPage(state) {
			return state.tableRecords.length > state.activePage * COUNT_RECORDS_ON_PAGE;
		},
	},
	mutations: {
		setInfoForTable(state, data) {
			state.tableRecords = data;
		},
		changeActivePage(state, number) {
			state.activePage = number;
		},
	},
	actions: {
		async loadInfoForTable({ commit }, tickersNames) {
			const data = await loadInfoForTable(tickersNames);

			commit("setInfoForTable", data);
		},
	},
};
