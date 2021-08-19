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
		<button class="button-fill" @click="add">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				x="0px"
				y="0px"
				viewBox="0 0 512 512"
				style="enable-background: new 0 0 512 512"
				width="20"
				height="20"
				xml:space="preserve"
			>
				<g>
					<g>
						<path
							fill="#fff"
							d="M256,0C114.833,0,0,114.833,0,256s114.833,256,256,256s256-114.853,256-256S397.167,0,256,0z M256,472.341
						c-119.275,0-216.341-97.046-216.341-216.341S136.725,39.659,256,39.659S472.341,136.705,472.341,256S375.295,472.341,256,472.341z
						"
						/>
					</g>
				</g>
				<g>
					<g>
						<path
							fill="#fff"
							d="M355.148,234.386H275.83v-79.318c0-10.946-8.864-19.83-19.83-19.83s-19.83,8.884-19.83,19.83v79.318h-79.318
						c-10.966,0-19.83,8.884-19.83,19.83s8.864,19.83,19.83,19.83h79.318v79.318c0,10.946,8.864,19.83,19.83,19.83
						s19.83-8.884,19.83-19.83v-79.318h79.318c10.966,0,19.83-8.884,19.83-19.83S366.114,234.386,355.148,234.386z"
						/>
					</g>
				</g>
			</svg>
			Добавить
		</button>
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
	data() {
		return {
			ticker: "",
		};
	},
	computed: {
		...mapState(["tickers"]),
		...mapGetters(["tickersNames"]),
	},
	methods: {
		...mapMutations(["addTicker", "updateTickers"]),
		...mapActions(["subscribeToUpdate"]),
		async add() {
			let newTicker = {
				name: "",
				price: "-",
			};
			newTicker.name = this.ticker.toUpperCase();
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
.button-fill {
	display: flex;
	align-items: center;
	background: #444;
	color: #fff;
	padding: 3px 5px;
	border: 5px solid #444;
	border-radius: 18px;
	cursor: pointer;
}
.button-fill svg {
	margin-right: 8px;
}
</style>
