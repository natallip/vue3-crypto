<template>
	<div class="input-box">
		<label :for="name">{{ label }}</label>
		<input
			type="text"
			:id="name"
			:name="name"
			:placeholder="placeholder"
			:value="value"
			:disabled="disabled"
			@keyup="$emit('change', $event.target.value)"
			@keyup.enter="$emit('enter')"
		/>
	</div>
</template>

<script>
export default {
	props: {
		name: String,
		placeholder: String,
		value: String,
		label: String,
		disabled: Boolean,
	},
	emits: {
		change: null,
		enter: null,
	},
};
</script>

<style scoped>
.input-box {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-bottom: 10px;
}
label {
	margin-bottom: 10px;
}
input {
	padding: 5px;
	border: none;
	border-bottom: 2px solid #555;
}
</style>
