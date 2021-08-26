<template>
	<div class="addTicker">
		<app-input
			name="ticker"
			placeholder="Например DOGE"
			label="Тикер"
			:value="tickerName"
			@change="setTickerName"
			@enter="add"
		/>
		<app-button type="primary" icon="add" text="Добавить" @click="add" />
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import AppButton from "./UI/AppButton.vue";
import AppInput from "./UI/AppInput.vue";
import { normalizedTickerName } from "../utils/normalizeTickerName";

export default {
	components: {
		AppButton,
		AppInput,
	},
	async created() {
		await this.loadAvailableTickers();
	},
	computed: {
		...mapState("tickers", ["tickerName", "availableTickers"]),
		...mapGetters("tickers", ["tickersNames", "tickers"]),
		isTickerExist() {
			return this.tickers.find((t) => t.name === this.tickerName);
		},
		isAvailable() {
			return this.availableTickers?.find((t) => t === this.tickerName);
		},
	},
	methods: {
		...mapMutations("tickers", ["addTicker", "updateTickers", "changeTickerName"]),
		...mapActions("tickers", ["loadAvailableTickers", "subscribeToUpdate"]),
		setTickerName(value) {
			this.changeTickerName(normalizedTickerName(value));
		},
		add() {
			if (!this.tickerName || this.isTickerExist || !this.isAvailable) {
				this.changeTickerName("");
				return;
			}

			this.addTicker({
				name: this.tickerName,
				price: "-",
			});

			this.changeTickerName("");

			setInterval(async () => {
				await this.subscribeToUpdate();
			}, 3000);
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
</style>
