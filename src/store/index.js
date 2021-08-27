import { createStore } from "vuex";
import { tickers } from "./modules/tickers";
import { graph } from "./modules/graph";
import { table } from "./modules/table";

export default createStore({
	modules: {
		tickers,
		graph,
		table,
	},
});
