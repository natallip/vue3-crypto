<template>
	<div class="filter">
		<div class="filter__title">Filter:</div>
		<app-select
			:options="options"
			:value="filterParams.type"
			text="Select type"
			@change="changeType($event)"
		/>
		<app-input
			type="text"
			name="filter"
			placeholder="Find"
			:value="filterParams.value"
			:disabled="!isSelectOption"
			@change="changeValue($event)"
		/>
	</div>
</template>

<script>
import AppInput from "@/components/UI/AppInput.vue";
import AppSelect from "@/components/UI/AppSelect.vue";

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
		filterParams: Object,
	},
	emits: {
		filter: null,
	},
	computed: {
		isSelectOption() {
			return this.filterObj.type || this.filterParams.type;
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
		changeValue(value) {
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
	justify-content: center;
}
.filter__title {
	margin-right: 10px;
}
</style>
