import "./scss/styles.scss";
import { Api } from "./components/base/api";
import { API_URL } from "./utils/constants";
import { start } from "./runtime";
import App from "./app";

start(App, {
	api: new Api(API_URL),
	selectedModal: null,
	products: {
		items: [],
		fetched: false,
		rendered: false,
	},
});
