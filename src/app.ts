import { Api } from "./components/base/api";
import ProductList from "./components/product-list";
import type { State, Effect, App as A } from "./types";
import { API_URL } from "./utils/constants";

const App: A<State, Effect> = {
	update(_, eff) {
		switch (eff.type) {
			case "fetched":
				return {
					fetched: true,
					products: eff.products,
				};
		}
	},

	root() {
		const api = new Api(API_URL);
		return [ProductList(api)];
	},
};

export default App;
