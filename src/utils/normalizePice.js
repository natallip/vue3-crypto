export const normalizePrice = (price) => {
	if (price === "-" || !price) {
		return "-";
	}
	if (price > 0) {
		return price.toFixed(2);
	}
	return price.toPrecision(2);
};
