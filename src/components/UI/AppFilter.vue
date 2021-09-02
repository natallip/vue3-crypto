<template>
	<div class="filter">
		<div class="filter__title">Filter:</div>
		<app-select :options="options" text="Select type" @change="changeType($event)" />
		<app-input
			type="text"
			name="filter"
			placeholder="Find"
			:value="value"
			:disabled="!isSelectOption"
			@change="filter($event)"
		/>
	</div>
</template>

<script>
import AppInput from "./AppInput.vue";
import AppSelect from "./AppSelect.vue";

export default {
	data() {
		return {
			filterObj: {
				type: null,
				value: "",
			},
		};
	},
	components: { AppSelect, AppInput },
	props: {
		options: Array,
		value: [String, Number],
	},
	emits: {
		filter: null,
	},
	computed: {
		isSelectOption() {
			return this.filterObj.type;
		},
	},
	methods: {
		changeType(type) {
			this.filterObj = {
				type,
				value: "",
			};

			this.$emit("filter", this.filterObj);
		},
		filter(value) {
			this.filterObj.value = value;

			this.$emit("filter", this.filterObj);
		},
	},
};
</script>

<style>
.filter {
	margin: 20px auto;
	display: flex;
	align-items: center;
}
.filter__title {
	margin-right: 10px;
}
</style>
