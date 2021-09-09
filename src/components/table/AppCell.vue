<template>
	<div :class="classes">
		<img v-if="isImage" class="td__img" :src="src" :alt="alt" />
		<div v-else>{{ text }}</div>
	</div>
</template>

<script>
export default {
	props: {
		type: String,
		text: String,
		src: String,
		alt: String,
		title: Boolean,
	},
	computed: {
		isImage() {
			return this.type === "image" && !this.title;
		},
		classes() {
			return `td td--${this.type}`;
		},
	},
};
</script>

<style>
a {
	text-decoration: none;
	color: #111;
}
.td {
	display: flex;
	padding: 10px 20px;
	min-width: 100px;
	flex-shrink: 0;
	flex-grow: 0;
}
.td__img {
	width: 30px;
	height: 30px;
	object-fit: contain;
}
.td {
	width: 200px;
}
.td--title {
	font-weight: bold;
}
.td--name,
.td--fullName {
	width: 130px;
}
.td--fullName {
	width: 200px;
}
.td--image {
	width: 150px;
	justify-content: center;
}
.td--price,
.td--highDay,
.td--lowDay,
.td--changeDay {
	width: 180px;
	justify-content: flex-end;
}
.td--bg {
	background: #4e0281;
	color: #fff;
	font-size: 1rem;
}
</style>
