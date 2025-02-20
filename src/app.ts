import ProductList from "./components/product-list";
import type { State, Effect, App as A } from "./types";

const App: A<State, Effect> = {
	update(state, eff) {
		switch (eff.type) {
			case "fetched":
				return {
					...state,
					products: {
						items: eff.items,
						fetched: true,
						rendered: false,
					},
				};

			case "rendered":
				return {
					...state,
					products: {
						...state.products,
						rendered: true,
					},
				};
		}
	},

	root: () => [ProductList],
};

export default App;
