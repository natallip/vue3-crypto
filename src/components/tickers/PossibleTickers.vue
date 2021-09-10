<template>
	<div class="possibleTickers">
		<template v-for="ticker in possibleTickers" :key="ticker">
			<app-checkbox :text="ticker" @change="change" />
		</template>
	</div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import AppCheckbox from "@/components/UI/AppCheckbox.vue";

export default {
	components: { AppCheckbox },
	data() {
		return {
			checkedValues: [],
		};
	},
	computed: {
		...mapState("tickers", ["possibleTickers"]),
	},
	emits: {
		change: null,
	},
	methods: {
		...mapMutations("tickers", ["changeTickerName"]),
		change(value, isChecked) {
			if (!isChecked) {
				this.checkedValues = this.checkedValues.filter((v) => v !== value);
			} else {
				this.checkedValues.push(value);
			}

			this.$emit("change", this.checkedValues);
		},
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
