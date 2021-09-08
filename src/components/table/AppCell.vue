<template>
	<td :colspan="colspan" :class="classes">
		<h2 v-if="isTitle">{{ text }}</h2>
		<img v-if="isImage" class="cell__img" :src="src" :alt="alt" />
		<router-link v-if="isFullName" :to="link">{{ text }}</router-link>
		<p v-if="isText">{{ text }}</p>
	</td>
</template>

<script>
import { SINGLE_TICKER } from "@/router/constants";

export default {
	props: {
		type: String,
		text: String,
		src: String,
		alt: String,
		name: Boolean,
		tickerName: String,
		colspan: Number,
	},
	computed: {
		link() {
			return `${SINGLE_TICKER}/${this.tickerName}`;
		},
		isTitle() {
			return this.type === "title";
		},
		isImage() {
			return this.type === "image";
		},
		isFullName() {
			return this.type === "fullName";
		},
		isName() {
			return !!this.name;
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

<style>
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
