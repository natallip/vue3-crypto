<template>
	<div class="filter">
		<div class="filter__title">Фильтровать:</div>
		<app-select :options="options" @change="changeType($event)" />
		<app-input
			name="filter"
			placeholder="Искать"
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
	components: { AppSelect, AppInput },
	name: "AppFilter",
	data() {
		return {
			filterObj: {
				type: null,
				value: "",
			},
		};
	},
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
