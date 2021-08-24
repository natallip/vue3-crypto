<template>
	<ul class="tickers-list">
		<li
			v-for="ticker in tickers"
			:key="ticker"
			:class="{ active: isSelected(ticker.name) }"
			class="ticker-item"
			@click="selectTicker(ticker.name)"
		>
			<div class="ticker-box">
				<h2 class="ticker-title">{{ ticker.name }} - USD</h2>
				<div class="ticker-price">{{ normalizePrice(ticker.price) }}</div>
				<div class="ticker-delete">
					<app-button type="delete" @delete="remove(ticker.name)" />
				</div>
			</div>
		</li>
	</ul>
</template>

<script>
import AppButton from "./UI/AppButton.vue";
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
	components: { AppButton },
	computed: {
		...mapState("tickers", ["tickers", "selectedTicker"]),
		...mapGetters("tickers", ["tickersNames"]),
	},
	methods: {
		...mapMutations("tickers", ["deleteTicker", "setSelectedTicker"]),
		remove(name) {
			if (name === this.selectedTicker) {
				this.setSelectedTicker(null);
			}
			this.deleteTicker(name);
			window.localStorage.setItem(
				"crypto-tickers",
				JSON.stringify(this.tickersNames)
			);
		},
		normalizePrice(price) {
			if (price === "-" || !price) {
				return "-";
			}
			if (price > 0) {
				return price.toFixed(2);
			} else {
				return price.toFixed(4);
			}
		},
		selectTicker(ticker) {
			this.setSelectedTicker(ticker);
		},
		isSelected(ticker) {
			return this.selectedTicker === ticker;
		},
	},
};
</script>

<style scoped>
.tickers-list {
	list-style: none;
	display: flex;
	flex-wrap: wrap;
	margin-left: -20px;
	margin-top: 40px;
	padding: 0;
}
.ticker-item {
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
.ticker-item.active {
	box-shadow: 0 0 1px 3px #4e0281;
}
.ticker-box {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.ticker-title {
	padding: 10px 5px;
	font-size: 1rem;
	text-transform: uppercase;
}
.ticker-price {
	padding: 10px;
	font-size: 2rem;
	font-weight: bold;
}
.ticker-delete {
	padding: 10px;
}
</style>
