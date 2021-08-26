import { axiosInstance } from "./index";
import config from "../config.json";
const { API_KEY } = config;

export const loadTickers = async (tickersNames) => {
	if (!tickersNames || !tickersNames.length) return;
	const fsyms = tickersNames.join(",");
	const { data } = await axiosInstance({
		url: "data/pricemulti",
		params: {
			fsyms,
			tsyms: "USD",
			api_key: API_KEY,
		},
	});
	return Object.entries(data).map(([key, value]) => {
		return {
			name: key,
			price: value.USD,
		};
	});
};
