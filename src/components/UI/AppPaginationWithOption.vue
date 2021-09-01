<template>
	<div class="toggle-count">
		<span>Records on page:</span>
		<template v-for="item in options" :key="item">
			<label :for="countName(item)" :class="{ active: isChecked(item) }">{{ item }}</label>
			<input
				type="radio"
				v-model="selected"
				:name="countName(item)"
				:id="countName(item)"
				:value="item"
				@change="$emit('change', $event)"
			/>
		</template>
	</div>
	<template v-if="selected !== 'all'">
		<app-pagination :pages="pages" :activePage="activePage" @click="$emit('click', $event)" />
	</template>
</template>

<script>
import AppPagination from "@/components/UI/AppPagination.vue";

export default {
	components: { AppPagination },
	data() {
		return {
			selected: 10,
			options: [10, 20, "all"],
		};
	},
	props: {
		pages: Number,
		activePage: Number,
	},
	emits: {
		click: null,
		change: null,
	},
	methods: {
		isChecked(value) {
			return value == this.selected;
		},
		countName(value) {
			return `count-${value}`;
		},
	},
};
</script>

<style>
.toggle-count {
	margin: 10px 0;
	display: flex;
	align-items: baseline;
	justify-content: center;
}
.toggle-count span {
	margin-right: 15px;
}
.toggle-count input[type="radio"] {
	display: none;
}
.toggle-count label {
	min-width: 20px;
	margin-right: 10px;
	color: #4e0281;
	font-weight: bold;
	cursor: pointer;
}
.toggle-count label.active {
	border-bottom: 2px solid #4e0281;
}
</style>
