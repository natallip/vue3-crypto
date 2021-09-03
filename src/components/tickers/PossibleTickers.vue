<template>
	<div class="possibleTickers">
		<template v-for="ticker in possibleTickers" :key="ticker">
			<app-button type="success" :text="ticker" @click="changeTickerName(ticker)" />
		</template>
	</div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import AppButton from "@/components/UI/AppButton.vue";

export default {
	components: { AppButton },
	computed: {
		...mapState("tickers", ["possibleTickers"]),
	},
	emits: {
		click: null,
	},
	methods: {
		...mapMutations("tickers", ["changeTickerName"]),
	},
};
</script>

<style>
.possibleTickers {
	display: flex;
	align-items: center;
	margin-bottom: 10px;
}
.possibleTickers button {
	margin-right: 10px;
}
</style>
