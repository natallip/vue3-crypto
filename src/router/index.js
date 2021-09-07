import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import SelectTickers from "../views/SelectTickers.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/selectTickers",
		name: "Select Tickers",
		component: SelectTickers,
	},
	{
		path: "/singleTicker/:id",
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
