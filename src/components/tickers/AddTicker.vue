<template>
	<div class="addTicker">
		<app-input
			name="ticker"
			placeholder="DOGE"
			label="Тикер"
			type="text"
			:value="tickerName"
			@change="setTickerName"
			@enter="addOneTicker"
		/>
		<possible-tickers @change="setCheckedTickers" />
		<app-button v-if="!isDisabled" type="primary" icon="add" text="Add" @click="addArrTickers" />
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
	data() {
		return {
			checkedTickers: [],
		};
	},
	computed: {
		...mapState("tickers", ["tickerName", "availableTickers"]),
		...mapGetters("tickers", ["tickersNames", "tickers"]),
		isTickerExist() {
			return [...this.tickers].find((el) => el.name === this.tickerName);
		},
		isAvailable() {
			return this.availableTickers?.find((t) => t === this.tickerName);
		},
		isDisabled() {
			return !this.checkedTickers.length;
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
		setCheckedTickers(values) {
			this.checkedTickers = values;
		},
		async add() {
			setInLocalStorage(this.tickersNames);

			await this.subscribeToUpdate(this.tickerName);

			this.changeTickerName("");
		},
		addOneTicker() {
			if (!this.tickerName || this.isTickerExist || !this.isAvailable) {
				this.changeTickerName("");

				return;
			}

			this.addTicker({
				name: this.tickerName,
				price: "-",
			});

			this.add();
		},
		addArrTickers() {
			this.checkedTickers.forEach((el) => {
				this.addTicker({
					name: el,
					price: "-",
				});
			});

			this.add();
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
