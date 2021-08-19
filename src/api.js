import axios from "axios";
import config from "./config.json";
const { API_KEY } = config.API_KEY;

export const loadTickers = async (tickersNames) => {
	if (tickersNames.lenght === 0) return;
	const response = await axios(
		`https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${tickersNames.join(
			","
		)}&api_key=${API_KEY}`
	);
	let updatesTickers = await response.data;
	updatesTickers = Object.entries(updatesTickers).map(([key, value]) => {
		return {
			name: key,
			price: 1 / value,
		};
	});
	return updatesTickers;
};
