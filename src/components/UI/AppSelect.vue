<template>
	<select v-model="selected" @change="$emit('change', this.selected)">
		<option disabled value="">Select type</option>
		<option v-for="item in options" :value="item" :key="item">
			{{ item }}
		</option>
	</select>
</template>

<script>
export default {
	name: "AppButton",
	data() {
		return {
			data: {
				selected: "",
			},
		};
	},
	props: {
		options: Array,
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
