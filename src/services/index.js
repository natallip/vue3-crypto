import axios from "axios";
import config from "./config.json";
// const { API_KEY } = config.API_KEY;

console.log(axios, config);

export const axiosInstance = axios.create({
  baseURL: "https://min-api.cryptocompare.com/"
});

console.log(111, axiosInstance);
