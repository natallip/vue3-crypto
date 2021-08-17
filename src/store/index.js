import { createStore } from "vuex";
// import config from "../config.json"
// import axios from "axios"

export default createStore({
  state: {
    tickers: [
      {title: "BTC", price: 100},
      {title: "SOL", price: 150}
    ]
  },
  getters: {
    tickersTitles(state) {   
      
      return state.tickers.reduce((acc, curr) => {
        // console.log(acc);
        // console.log(state);
        return [...acc, curr.title]}, []);        
    }
  },
  mutations: {
    setTickers (state, tickers) {
      state.tickers = tickers;
    },
    addTicker (state, ticker) {
      state.tickers.push(ticker);
    },
    deleteTicker(state, title) {
      state.tickers = state.tickers.filter(t => t.title !== title);
    }
  },
  actions: {
    loadTickers ({commit}) {
      //console.log("API_KEY", config.API_KEY);

      // let getFullURL = function(url, options){
      //   const params = [];
      //   for (let key in options) {
      //     params.push(`${key}=${options[key]}`);
      //   }
      //   return url + '?' + params.join("&");
      // }
      
      // const apiKey = config.API_KEY;
      
      // const baseUrl = "https://min-api.cryptocompare.com/data/price"
      
      // let options = {
      //   fsym: "BTC",
      //   tsyms: "USD"
      // };
      
      // let headers = {
      //   "Authorization": "Apikey " + apiKey 
      // };
      
      // let fullURL = getFullURL(baseUrl, options);
      
      // axios.get(fullURL, {headers: headers})
      //   .then((response) => {
      //     //console.log(response.data);
      //     // console.log(response.status);
      //     // console.log(response.statusText);
      //     // console.log(response.headers);
      //     //console.log(response.config);
      //   });
      
      commit("setTickers");
    }
  }
});
