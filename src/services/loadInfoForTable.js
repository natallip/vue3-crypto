import { axiosInstance } from "./index";
import { URL_INFO, DEFAULT_CURRENCY, LIMIT_COUNT_FOR_REGUEST, API_KEY } from "../constants/index";

export const loadInfoForTable = async () => {
	const {
		data: { Data }
	} = await axiosInstance({
		url: URL_INFO,
		params: {
			limit: LIMIT_COUNT_FOR_REGUEST,
			tsym: DEFAULT_CURRENCY,
			api_key: API_KEY,
		},
	});

	const infoData = Data.map((item, i) => {
		return {
			number: ++i,
			image: `https://cryptocompare.com${item.CoinInfo.ImageUrl}`,
			name: item.CoinInfo.Name,
			fullName: item.CoinInfo.FullName,
			price: item.DISPLAY?.USD.PRICE,
			highDay: item.DISPLAY?.USD.HIGHDAY,
			lowDay: item.DISPLAY?.USD.LOWDAY,
			changeDay: item.DISPLAY?.USD.CHANGEDAY
		};
	});

	return infoData || [];
};
