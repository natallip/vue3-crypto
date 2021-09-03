export const setInLocalStorage = (tickersNames) => {
	window.localStorage.setItem("crypto-tickers", JSON.stringify(tickersNames));
};

export const getFromLocalStorage = () => {
	const tickersData = window.localStorage.getItem("crypto-tickers");
	//let tickers = [];

	if (tickersData !== "undefined") {
		return JSON.parse(tickersData).map((t) => {
			return {
				name: t,
				price: "-",
			};

			//this.addTicker(newTicker);
		});
	}

	return;
};
