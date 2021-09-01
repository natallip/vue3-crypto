<template>
	<div>
		<apexchart width="1000" height="500" type="area" :options="chartOptions" :series="series" />
	</div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
	components: { apexchart: VueApexCharts },
	props: {
		series: Array,
		xaxis: Array,
	},
	data() {
		return {
			chartOptions: {
				chart: {
					id: "realtime",
					animations: {
						enabled: true,
						easing: "linear",
						dynamicAnimation: {
							speed: 1000,
						},
					},
					toolbar: {
						show: false,
					},
					zoom: {
						enabled: false,
					},
				},
				dataLabels: {
					enabled: false,
				},
				stroke: {
					curve: "smooth",
				},
				title: {
					text: "Dynamic Updating Chart",
					align: "center",
				},
				xaxis: {
					type: "category",
					categories: this.xaxis,
				},
			},
		};
	},
};
</script>
