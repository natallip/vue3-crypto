<template>
	<app-graph />
	<div class="graph-options">
		<div class="graph-options__title">Select a type of the chart:</div>
		<app-select
			text="Select type"
			:options="options"
			:defaultValue="type"
			@change="changeType($event)"
		/>
	</div>
	<div class="graph-options">
		<div class="graph-options__title">Select a color of the chart:</div>
		<app-input name="color" type="color" value="#1378EB" @change="changeColor($event)" />
	</div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import AppGraph from "@/components/UI/AppGraph.vue";
import AppSelect from "@/components/UI/AppSelect.vue";
import AppInput from "@/components/UI/AppInput.vue";

export default {
	components: { AppGraph, AppSelect, AppInput },
	data() {
		return {
			options: ["area", "line", "bar"],
		};
	},
	computed: {
		...mapState("graph", ["type"]),
	},
	methods: {
		...mapMutations("graph", ["changeType", "changeColor"]),
	},
};
</script>

<style>
.graph-options {
	display: flex;
	align-items: center;
	margin: 10px 0;
}
.graph-options__title {
	margin-right: 10px;
}
.graph-options .input-box input {
	min-height: 30px;
	border: 2px solid #4e0281;
	background-color: #fff;
}
</style>
