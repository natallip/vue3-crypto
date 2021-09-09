<template>
	<nav class="nav">
		<div class="nav__list">
			<router-link class="nav__link" v-for="item in menu" :key="item.name" :to="item.link" exact>{{
				item.name
			}}</router-link>
		</div>
	</nav>
</template>

<script>
import { HOME, SELECT_TICKERS } from "@/router/constants";

export default {
	data() {
		return {
			menu: [
				{ name: "home", link: HOME },
				{ name: "select tickers", link: SELECT_TICKERS },
			],
		};
	},
};
</script>

<style scoped>
.nav__list {
	display: flex;
}
.nav__link {
	color: #555;
	text-decoration: none;
	padding: 5px;
	margin-right: 10px;
	border: 2px solid #555;
}
.router-link-exact-active {
	color: #4e0281;
}
</style>
