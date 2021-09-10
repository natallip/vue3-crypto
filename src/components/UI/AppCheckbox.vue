<template>
	<input
		type="checkbox"
		:name="text"
		:id="text"
		:value="text"
		@change="$emit('change', $event.target.value, $event.target.checked)"
	/>
	<label type="checkbox" class="button button--primary2" :for="text">{{ text }}</label>
</template>

<script>
export default {
	props: {
		text: [String, Number],
		value: {
			type: Boolean,
			default: false,
		},
	},
	emits: {
		change: null,
	},
};
</script>

<style>
input[type="checkbox"] {
	display: none;
}
.m8 {
	margin-right: 8px;
}
input[type="checkbox"]:checked + label {
	background: #00694a;
	color: #fff;
}
</style>
