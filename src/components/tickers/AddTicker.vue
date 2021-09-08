<template>
	<div class="addTicker">
		<app-input
			name="ticker"
			placeholder="DOGE"
			label="Тикер"
			type="text"
			:value="tickerName"
			@change="setTickerName"
			@enter="add"
		/>
		<possible-tickers />
		<app-button type="primary" icon="add" text="Add" @click="add" />
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import AppButton from "@/components/UI/AppButton.vue";
import AppInput from "@/components/UI/AppInput.vue";
import PossibleTickers from "@/components/tickers/PossibleTickers.vue";
import { normalizeName } from "@/utils/normalizeName";
import { setInLocalStorage } from "@/services/savingDataInLS";

export default {
	components: { AppButton, AppInput, PossibleTickers },
	computed: {
		...mapState("tickers", ["tickerName", "availableTickers"]),
		...mapGetters("tickers", ["tickersNames", "tickers"]),
		isTickerExist() {
			return [...this.tickers].find((t) => t.name === this.tickerName);
		},
		isAvailable() {
			return this.availableTickers?.find((t) => t === this.tickerName);
		},
	},
	async created() {
		await this.loadAvailableTickers();
	},
	methods: {
		...mapMutations("tickers", [
			"addTicker",
			"updateTickers",
			"changeTickerName",
			"setPossibleTickers",
		]),
		...mapActions("tickers", ["subscribeToUpdate", "loadAvailableTickers"]),
		setTickerName(value) {
			this.setPossibleTickers(normalizeName(value));
			this.changeTickerName(normalizeName(value));
		},
		async add() {
			if (!this.tickerName || this.isTickerExist || !this.isAvailable) {
				this.changeTickerName("");

				return;
			}

			this.addTicker({
				name: this.tickerName,
				price: "-",
			});

			setInLocalStorage(this.tickersNames);

			await this.subscribeToUpdate(this.tickerName);

			this.changeTickerName("");
		},
	},
};
</script>

<style scoped>
.addTicker {
	margin-top: 30px;
	text-align: left;
	margin-bottom: 2px;
}
</style>
