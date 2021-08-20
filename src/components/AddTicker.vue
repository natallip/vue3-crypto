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
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import AppButton from "./UI/AppButton.vue";

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
		...mapState(["tickers", "avaibleTickers"]),
		...mapGetters(["tickersNames"]),
		isTickerExist() {
			return this.tickers?.find((t) => t.name === this.ticker.toUpperCase());
		},
		isAvaible() {
			return this.avaibleTickers.find((t) => t === this.ticker.toUpperCase());
		},
	},
	methods: {
		...mapMutations(["addTicker", "updateTickers"]),
		...mapActions(["subscribeToUpdate", "loadAvaibleTickers"]),
		async add() {
			if (this.ticker.lenght === 0 || this.isTickerExist || !this.isAvaible) {
				this.ticker = "";
				return;
			}
			let newTicker = {
				name: this.ticker.toUpperCase(),
				price: "-",
			};
			this.addTicker(newTicker);
			await this.subscribeToUpdate();
			this.ticker = "";
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
}
</style>
