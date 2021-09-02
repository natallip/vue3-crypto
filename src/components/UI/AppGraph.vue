<template>
	<div class="chart">
		<apexchart
			ref="chart"
			width="100%"
			height="450"
			:type="type"
			:options="options"
			:series="limitedSeries"
		/>
	</div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import VueApexCharts from "vue3-apexcharts";

export default {
	components: { apexchart: VueApexCharts },
	computed: {
		...mapState("graph", ["type"]),
		...mapGetters("graph", ["options", "limitedSeries"]),
	},
	methods: {
		...mapMutations("graph", ["clearGraph"]),
	},
	unmounted() {
		this.clearGraph();
	},
};
</script>
