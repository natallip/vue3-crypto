import { createStore } from "vuex";
import config from "../config.json";
// import axios from "axios"

export default createStore({
  state: {
    tickers: [],
  },
  getters: {
    tickersTitles(state) {
      return state.tickers.reduce((acc, curr) => [...acc, curr.title], []);
    },
  },
  mutations: {
    setTickers(state, tickers) {
      state.tickers = tickers;
    },
    addTicker(state, ticker) {
      state.tickers.push(ticker);
    },
    deleteTicker(state, name) {
      state.tickers = state.tickers.filter((t) => t.name !== name);
    },
    updateTicker(state, ticker) {
      const ind = state.tickers.findIndex((t) => t.name === ticker.name);
      if (state.tickers[ind]) {
        state.tickers[ind].price = ticker.price;
      }
    },
  },
  actions: {
    subscribeToUpdate(context, newTicker) {
      function update(ticker) {
        const { API_KEY } = config.API_KEY;
        const price = fetch(
          `https://min-api.cryptocompare.com/data/price?fsym=${ticker.name}&tsyms=USD&api_key=${API_KEY}`
        )
          .then((res) => res.json())
          .then((data) => data.USD);

        const t = ticker;
        t.price = price;
        console.log(t);
        return t;
      }
      setInterval(() => {
        const ticker = update(newTicker);
        context.commit("updateTicker", ticker);
      }, 5000);
    },
  },
});
