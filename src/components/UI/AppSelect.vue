<template>
	<select v-model="selectedValue" @change="$emit('change', $event.target.value)">
		<option disabled value="">{{ text }}</option>
		<option v-for="item in options" :value="item" :key="item">
			{{ item }}
		</option>
	</select>
</template>

<script>
export default {
	data() {
		return {
			data: {
				selectedValue: "",
			},
		};
	},
	props: {
		options: Array,
		text: String,
		defaultValue: String,
	},
	emits: {
		change: null,
	},
	created() {
		this.selectedValue = this.defaultValue;
	},
};
</script>

<style>
select {
	margin-right: 10px;
	border: 2px solid #4e0281;
	padding: 5px;
	background: #fff;
	border-radius: 0;
	outline: transparent;
}
</style>
