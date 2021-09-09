<template>
	<select :value="value" @change="$emit('change', $event.target.value)">
		<option v-for="item in options" :value="item" :key="item">
			{{ item }}
		</option>
	</select>
</template>

<script>
export default {
	props: {
		options: Array,
		text: String,
		value: String,
	},
	emits: {
		change: null,
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
