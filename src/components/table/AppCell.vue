<template>
	<td :class="classes">
		<h2 v-if="type === 'title'">{{ text }}</h2>
		<img v-if="type === 'image'" :src="src" :alt="alt" class="cell__img" />
		<router-link v-if="type === 'fullName'" :to="`/singleTicker/${tickerName}`">{{
			text
		}}</router-link>
		<p v-if="isText">{{ text }}</p>
	</td>
</template>

<script>
export default {
	props: {
		type: String,
		text: String,
		src: String,
		alt: String,
		name: Boolean,
		tickerName: String,
	},
	computed: {
		isName() {
			return this.name;
		},
		isText() {
			return this.type !== "title" && this.type !== "image" && this.type !== "fullName";
		},
		classes() {
			let classes = ["cell"];

			if (this.isName) classes.push("cell--fix");
			if (this.type === "title") classes.push("cell--bg");

			return classes;
		},
	},
};
</script>

<style scoped>
.cell {
	vertical-align: middle;
	padding: 0 20px;
	min-width: 100px;
}
.cell__img {
	width: 30px;
	height: 30px;
	object-fit: contain;
}
.cell--fix {
	min-width: 200px;
}
.cell--bg {
	background: #4e0281;
	color: #fff;
	font-size: 1rem;
}
</style>
