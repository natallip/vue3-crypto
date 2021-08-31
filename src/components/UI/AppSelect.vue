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
	},
	emits: {
		change: null,
	},
};
</script>

<style>
select {
	margin-right: 10px;
}
</style>
