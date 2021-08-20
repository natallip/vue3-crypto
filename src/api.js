import axios from "axios";
import config from "./config.json";
const { API_KEY } = config.API_KEY;

export const loadTickers = async (tickersNames) => {
	if (!tickersNames || !tickersNames.length) return;
	const { data } = await axios(
		`https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${tickersNames.join(
			","
		)}&api_key=${API_KEY}`
	);
	let updatesTickers = data;
	updatesTickers = Object.entries(updatesTickers).map(([key, value]) => {
		return {
			name: key,
			price: 1 / value,
		};
	});
	return updatesTickers;
};
