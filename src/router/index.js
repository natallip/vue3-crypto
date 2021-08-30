import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/selectTickers",
		name: "SelectTickers",
		component: () => import("../views/SelectTickers.vue"),
	},
	{
		path: "/singleTicker/:id",
		name: "SingleTicker",
		component: () => import("../views/SingleTicker.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
