<template>
	<svg-sprite />
	<main-layout>
		<add-ticker />
		<hr v-if="isEmpty" />
		<list-tickers />
		<hr v-if="isEmpty" />
		<app-graph v-if="isSelected" />
	</main-layout>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { getFromLocalStorage } from "@/services/savingDataInLS";
import AddTicker from "@/components/tickers/AddTicker";
import ListTickers from "@/components/tickers/ListTickers.vue";
import AppGraph from "@/components/UI/AppGraph.vue";
import SvgSprite from "@/components/UI/SvgSprite.vue";
import MainLayout from "@/layouts/mainLayout.vue";

export default {
	components: {
		AddTicker,
		ListTickers,
		AppGraph,
		SvgSprite,
		MainLayout,
	},
	computed: {
		...mapGetters("tickers", ["tickers"]),
		...mapGetters("graph", ["limitedSeries"]),
		isEmpty() {
			return this.tickers.size;
		},
		isSelected() {
			return this.limitedSeries.length;
		},
	},
	created() {
		let savingTickers = getFromLocalStorage();

		if (!this.tickers.size) {
			savingTickers?.forEach((t) => {
				this.addTicker(t);

				this.subscribeToUpdate(t.name);
			});
		}
	},
	methods: {
		...mapMutations("tickers", ["addTicker"]),
		...mapActions("tickers", ["subscribeToUpdate"]),
	},
};
</script>
