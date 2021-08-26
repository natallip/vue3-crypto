import { axiosInstance } from "./index";
import config from "../config.json";
const { URL_COINS } = config;

export const loadAvailableTickers = async () => {
	const {
		data: { Data },
	} = await axiosInstance({
		url: URL_COINS,
		params: {
			summary: true,
		},
	});
	return Object.keys(Data) || [];
};
