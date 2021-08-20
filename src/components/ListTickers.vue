<template>
	<ul class="tickers-list">
		<li
			v-for="(ticker, i) in tickers"
			:key="i"
			:class="{ active: isSelected }"
			class="ticker-item"
			@click="selectTicker(ticker)"
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
import { mapState, mapMutations } from "vuex";
import AppButton from "./UI/AppButton.vue";

export default {
	data() {
		return {
			countOnPage: 6,
		};
	},
	components: { AppButton },
	computed: {
		...mapState(["tickers", "selectedTicker"]),
		isSelected() {
			return this.selectedTicker === this.ticker.name;
		},
	},
	methods: {
		...mapMutations(["deleteTicker", "setSelectedTicker", "clearGraph"]),
		remove(name) {
			if (name === this.selectedTicker) {
				this.setSelectedTicker(null);
			}
			this.deleteTicker(name);
		},
		normalizePrice(price) {
			if (price === "-" || !price) {
				return "-";
			}
			if (price > 0) {
				price = price.toFixed(2);
			} else {
				price = price.toFixed(4);
			}
			return price;
		},
		selectTicker(ticker) {
			this.setSelectedTicker(ticker.name);
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
