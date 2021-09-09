<template>
	<app-header />
	<router-view />
</template>

<script>
import AppHeader from "@/components/UI/AppHeader.vue";

export default {
	components: { AppHeader },
};
</script>

<style>
body,
html {
	padding: 0;
	margin: 0;
}
* {
	box-sizing: border-box;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
ul {
	list-style: none;
	padding: 0;
	margin: 0;
}
</style>
