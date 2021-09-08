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
import { mapState } from "vuex";
import AppInput from "@/components/UI/AppInput.vue";
import AppSelect from "@/components/UI/AppSelect.vue";

export default {
	components: { AppSelect, AppInput },
	props: {
		options: Array,
		filterParams: Object,
	},
	emits: {
		filter: null,
	},
	computed: {
		...mapState("table", ["filter"]),
		isSelectOption() {
			return !!this.filter.type;
		},
	},
	methods: {
		changeType(type) {
			this.$emit("filter", {
				type,
				value: "",
			});
		},
		changeValue(value) {
			if (this.filter.type) {
				this.$emit("filter", {
					type: this.filter.type,
					value,
				});
			}
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
