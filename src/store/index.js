import { createStore } from "vuex";
import { tickers } from "./modules/tickers";

export default createStore({
	modules: {
		tickers,
	},
});
