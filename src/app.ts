import ProductList from "./components/product-list";
import ProductModal from "./components/product-modal";
import type { State, Effect, App as IApp } from "./types";

export default class App implements IApp<State, Effect> {
	root = { render: () => [ProductList, ProductModal] };

	update(state: State, eff: Effect): State {
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
	}
}
