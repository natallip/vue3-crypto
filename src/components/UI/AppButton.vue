<template>
	<button :class="classes" @click.capture.stop="$emit('click')">
		<app-icon :id="icon" />
		{{ text }}
	</button>
</template>

<script>
import AppIcon from "./AppIcon.vue";
export default {
	name: "AppButton",
	props: {
		type: String,
		icon: String,
		text: String,
	},
	components: {
		AppIcon,
	},
	computed: {
		classes() {
			return `button button--${this.type} button--${this.icon}`;
		},
	},
	emits: {
		click: null,
	},
};
</script>

<style>
.button {
	display: flex;
	align-items: center;
	cursor: pointer;
	border: none;
	background: transparent;
	outline: transparent;
	padding: 0;
}
.button--primary {
	background: #555;
	color: #fff;
	padding: 5px;
	/* border: 5px solid #555; */
	border-radius: 18px;
}
.button--warn {
	background: #9c0707;
	border-radius: 18px;
	padding: 5px;
	color: #fff;
	/* background: #555;
	color: #fff;
	padding: 3px 5px;
	border: 5px solid #555;
	border-radius: 18px; */
}
.button--close {
	border: none;
	background: transparent;
	outline: transparent;
	padding: 0;
}
</style>
