import { axiosInstance } from "@/services/index";
import { URL_COINS } from "@/constants/index";

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
