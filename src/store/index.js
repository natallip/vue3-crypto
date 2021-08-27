import { createStore } from "vuex";
import { tickers } from "./modules/tickers";
import { graph } from "./modules/graph";

export default createStore({
	modules: {
		tickers,
		graph,
	},
});
