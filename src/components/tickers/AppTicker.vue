<template>
	<div class="ticker">
		<h2 class="ticker__title">{{ ticker.name }} - USD</h2>
		<div class="ticker__price">{{ price }}</div>
		<div class="ticker__delete">
			<app-button type="warn" icon="delete" text="Удалить" @click="$emit('delete', ticker.name)" />
		</div>
	</div>
</template>

<script>
import AppButton from "@/components/UI/AppButton.vue";
import { normalizePrice } from "@/utils/normalizePice";

export default {
	components: { AppButton },
	props: {
		ticker: Object,
	},
	emits: {
		delete: null,
	},
	computed: {
		price() {
			return normalizePrice(this.ticker.price);
		},
	},
};
</script>

<style scoped>
.ticker {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.ticker__title {
	padding: 10px 5px;
	font-size: 1rem;
	text-transform: uppercase;
}
.ticker__price {
	padding: 10px;
	font-size: 2rem;
	font-weight: bold;
}
.ticker__delete {
	padding: 10px;
}
</style>
