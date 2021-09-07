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
.container {
	max-width: 1200px;
	width: 90%;
	margin: 0 auto;
}
hr {
	margin: 10px 0;
}
ul {
	padding: 0;
	margin: 0;
	list-style: none;
}
</style>
