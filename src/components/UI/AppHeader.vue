<template>
	<header>
		<div class="container">
			<div class="header">
				<app-nav />
				<app-breadcrumbs />
			</div>
		</div>
	</header>
</template>

<script>
import AppNav from "@/components/UI/AppNav.vue";
import AppBreadcrumbs from "@/components/UI/AppBreadcrumbs.vue";

export default {
	components: { AppNav, AppBreadcrumbs },
};
</script>

<style>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px 0;
}
</style>
