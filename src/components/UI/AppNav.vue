<template>
	<div class="nav">
		<div class="container">
			<nav>
				<router-link v-for="link in filteredLinks" :key="link" :to="link.href" class="link">{{
					link.name
				}}</router-link>
			</nav>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			links: [
				{ name: "select tickers", href: "/selectTickers" },
				{ name: "top coins", href: "/" },
			],
		};
	},
	computed: {
		filteredLinks() {
			return [...this.links].filter((l) => l.href !== this.$route.fullPath);
		},
	},
};
</script>

<style>
.nav {
	background: #4e0281;
	color: #fff;
	padding: 20px 0;
}
nav {
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.link {
	padding: 5px 8px;
	text-decoration: none;
	background: #fff;
	color: #555;
	margin-left: 15px;
}
.link.active {
	color: #4e0281;
}
</style>
