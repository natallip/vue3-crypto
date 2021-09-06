<template>
	<div class="icon">
		<svg :class="id" :width="width" :height="height">
			<use :xlink:href="`#${id}`"></use>
		</svg>
	</div>
</template>

<script>
export default {
	props: {
		id: String,
		width: [String, Number],
		height: [String, Number],
	},
};
</script>

<style scoped>
.icon {
	display: flex;
	align-items: center;
}
.add,
.delete {
	margin-right: 8px;
	fill: #fff;
}
.close {
	fill: #444;
}
</style>
