<template>
	<ul class="tickers">
		<li
			v-for="ticker in tickers"
			class="tickers__item"
			:key="ticker"
			:class="{ active: isSelected(ticker.name) }"
			@click="setSelectedTicker(ticker.name)"
		>
			<app-ticker :ticker="ticker" @delete="remove" />
		</li>
	</ul>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import AppTicker from "./AppTicker.vue";

export default {
	components: { AppTicker },
	computed: {
		...mapState("tickers", ["selectedTicker"]),
		...mapGetters("tickers", ["tickers"]),
	},
	methods: {
		...mapMutations("tickers", ["deleteTicker", "setSelectedTicker"]),
		remove(name) {
			if (name === this.selectedTicker) {
				this.setSelectedTicker(null);
			}

			this.deleteTicker(name);
		},
		isSelected(ticker) {
			return this.selectedTicker === ticker;
		},
	},
};
</script>

<style scoped>
.tickers {
	list-style: none;
	display: flex;
	flex-wrap: wrap;
	margin-left: -20px;
	margin-top: 40px;
	padding: 0;
}
.tickers__item {
	width: 30%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-left: 20px;
	margin-bottom: 40px;
	text-align: center;
	border-radius: 5px;
	cursor: pointer;
}
.tickers__item.active {
	box-shadow: 0 0 1px 3px #4e0281;
}
</style>
