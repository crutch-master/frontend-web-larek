import ProductList from "./components/product-list";
import ProductModal from "./components/product-modal";
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

			case "products-rendered":
				return {
					...state,
					products: {
						...state.products,
						rendered: true,
					},
				};

			case "close-modal":
				return {
					...state,
					selectedModal: null,
				};

			case "open-product-modal":
				return {
					...state,
					selectedModal: {
						name: "product-preview",
						id: eff.id,
					},
				};
		}
	},

	root: { render: () => [ProductList, ProductModal] },
};

export default App;
