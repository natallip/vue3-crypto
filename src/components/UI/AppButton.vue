<template>
	<button :class="classes" @click.capture.stop="$emit('click')">
		<app-icon v-if="icon" width="20" height="20" :id="icon" />
		{{ text }}
	</button>
</template>

<script>
import AppIcon from "@/components/UI/AppIcon.vue";
export default {
	props: {
		type: String,
		icon: String,
		text: [String, Number],
		disabled: Boolean,
	},
	components: {
		AppIcon,
	},
	computed: {
		classes() {
			if (!this.icon) {
				return `button button--${this.type}`;
			}
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
	justify-content: center;
	cursor: pointer;
	border: none;
	background: transparent;
	outline: transparent;
	padding: 0;
	min-width: 30px;
}
.button--primary {
	background: #555;
	color: #fff;
	padding: 5px 8px;
}
.button--success {
	background: #00694a;
	color: #fff;
	padding: 5px 8px;
}
.button--warn {
	background: #9c0707;
	padding: 5px 8px;
	color: #fff;
}
.button--close {
	border: none;
	background: transparent;
	outline: transparent;
	padding: 0;
}
.button--primary2 {
	background: transparent;
	border: 2px solid #555;
	color: #555;
	padding: 5px;
	margin-right: 10px;
}
.button--active {
	background: #4e0281;
	color: #fff;
}
button:disabled {
	opacity: 0.5;
}
</style>
