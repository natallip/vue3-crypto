import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import SelectTickers from "@/views/SelectTickers.vue";
import { HOME, SELECT_TICKERS, SINGLE_TICKER } from "@/router/constants";

const routes = [
	{
		path: HOME,
		name: "Home",
		component: Home,
	},
	{
		path: SELECT_TICKERS,
		name: "Select Tickers",
		component: SelectTickers,
	},
	{
		path: `${SINGLE_TICKER}/:id`,
		name: "Ticker",
		component: () => import("../views/SingleTicker.vue"),
		meta: {
			breadcrumbs: [{ name: "home", link: "/" }, { name: "ticker" }],
		},
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
