import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "https://min-api.cryptocompare.com",
});
