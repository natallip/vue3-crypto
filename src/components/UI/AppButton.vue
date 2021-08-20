<template>
	<button v-if="type === 'add'" class="button fill" @click="$emit('add')">
		<app-icon type="add" />
		Добавить
	</button>
	<button v-if="type === 'delete'" class="button" @click="$emit('delete')">
		<app-icon type="delete" />
		Удалить
	</button>
	<button v-if="type === 'close'" class="button" @click="$emit('close')">
		<app-icon type="close" />
	</button>
</template>

<script>
import AppIcon from "./AppIcon.vue";
export default {
	name: "AppButton",
	props: {
		type: String,
		ticker: String,
	},
	components: {
		AppIcon,
	},
	emits: {
		add: null,
		delete: null,
		close: null,
	},
};
</script>

<style>
.button {
	display: flex;
	align-items: center;
	cursor: pointer;
	border: none;
	background: transparent;
	outline: transparent;
	padding: 0;
}
.fill {
	display: flex;
	align-items: center;
	background: #444;
	color: #fff;
	padding: 3px 5px;
	border: 5px solid #444;
	border-radius: 18px;
	cursor: pointer;
}
.close {
	border: none;
	background: transparent;
	outline: transparent;
	padding: 0;
}
</style>
