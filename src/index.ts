import "./scss/styles.scss";
import { Api, LarekAPI } from "./components/base/api";
import { API_URL } from "./utils/constants";
import { start } from "./runtime";
import App from "./app";

start(new App(new LarekAPI(new Api(API_URL))), {
	selectedModal: null,
	cart: [],
	form: {
		payment: "online",
		address: "",
		phone: "",
		email: "",
	},
	products: {
		items: [],
		fetched: false,
	},
});
