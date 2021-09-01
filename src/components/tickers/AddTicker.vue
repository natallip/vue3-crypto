<template>
	<div class="addTicker">
		<app-input
			name="ticker"
			placeholder="DOGE"
			label="Тикер"
			:value="tickerName"
			@change="setTickerName"
			@enter="add"
		/>
		<app-button type="primary" icon="add" text="Add" @click="add" />
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import AppButton from "@/components/UI/AppButton.vue";
import AppInput from "@/components/UI/AppInput.vue";
import { normalizeName } from "@/utils/normalizeName";

export default {
	components: {
		AppButton,
		AppInput,
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
	async created() {
		await this.loadAvailableTickers();
	},
	methods: {
		...mapMutations("tickers", ["addTicker", "updateTickers", "changeTickerName"]),
		...mapActions("tickers", ["subscribeToUpdate", "loadAvailableTickers"]),
		setTickerName(value) {
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

			await this.subscribeToUpdate(this.tickerName);

			this.changeTickerName("");
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
