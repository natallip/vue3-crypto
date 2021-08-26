import config from "../config.json";

const { API_KEY } = config;
const AGGREGATE_INDEX = "5";
const tickersHandlers = new Map();

let socket = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`);

socket.addEventListener("message", (e) => {
	const { TYPE: type, FROMSYMBOL: currency, PRICE: price } = JSON.parse(e.data);

	if (type !== AGGREGATE_INDEX) {
		return;
	}

	const handlers = tickersHandlers.get(currency) || [];

	handlers.forEach((fn) => fn(price));
});

function sendToWs(message) {
	const stringifiedMessage = JSON.stringify(message);

	if (socket.readyState === WebSocket.OPEN) {
		socket.send(stringifiedMessage);
		return;
	}

	socket.addEventListener("open", () => socket.send(stringifiedMessage), { once: true });
}

export const subscribeToUpdate = (ticker, cb) => {
	const subscribers = tickersHandlers.get(ticker) || [];

	tickersHandlers.set(ticker, [...subscribers, cb]);

	sendToWs({
		action: "SubAdd",
		subs: [`5~CCCAGG~${ticker}~USD`],
	});
};

export const unsubscribeToUpdate = (ticker) => {
	sendToWs({
		action: "SubRemove",
		subs: [`5~CCCAGG~${ticker}~USD`],
	});
};
