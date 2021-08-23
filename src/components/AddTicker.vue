<template>
	<div class="addTicker">
		<label for="ticker" class="ticker-label">Тикер</label>
		<div class="ticker-input">
			<input
				type="text"
				name="ticker"
				id="ticker"
				lass="ticker-input"
				placeholder="Например DOGE"
				v-model.trim="ticker"
				@keydown.enter="add"
			/>
		</div>
		<app-button type="add" @add="add" />
	</div>
</template>

<script>
import AppButton from "./UI/AppButton.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
	data() {
		return {
			ticker: "",
		};
	},
	components: {
		AppButton,
	},
	async created() {
		await this.loadAvaibleTickers();
	},
	computed: {
		...mapState("tickers", ["tickers", "avaibleTickers"]),
		...mapGetters("tickers", ["tickersNames"]),
		isTickerExist() {
			return this.tickers?.find((t) => t.name === this.ticker.toUpperCase());
		},
		isAvaible() {
			return this.avaibleTickers?.find((t) => t === this.ticker.toUpperCase());
		},
	},
	methods: {
		...mapMutations("tickers", ["addTicker", "updateTickers"]),
		...mapActions("tickers", ["loadAvaibleTickers", "subscribeToUpdate"]),
		add() {
			if (this.ticker.lenght === 0 || this.isTickerExist || !this.isAvaible) {
				this.ticker = "";
				return;
			}
			const newTicker = {
				name: this.ticker.toUpperCase(),
				price: "-",
			};
			this.addTicker(newTicker);
			setInterval(async () => {
				await this.subscribeToUpdate();
			}, 5000);
			this.ticker = "";
			window.localStorage.setItem(
				"crypto-tickers",
				JSON.stringify(this.tickersNames)
			);
		},
	},
};
</script>

<style scoped>
.addTicker {
	margin-top: 50px;
	text-align: left;
	margin-bottom: 2px;
}
.ticker-label {
	margin-right: 10px;
}
.ticker-input {
	margin: 10px 0;
}
.ticker-input input {
	padding: 5px;
	border: none;
	border-bottom: 2px solid #555;
}
</style>
