import type { Api } from "./components/base/api";
import { CartButton } from "./components/cart-button";
import { CartModal } from "./components/cart-modal";
import Collection from "./components/collection";
import ProductList from "./components/product-list";
import ProductModal from "./components/product-modal";
import type { State, Effect, App as IApp } from "./types";

export default class App implements IApp<State, Effect> {
	readonly root;

	constructor(api: Api) {
		this.root = new Collection([
			new ProductList(api),
			new ProductModal(),
			new CartModal(),
			new CartButton(),
		]);
	}

	update(state: State, eff: Effect): State {
		switch (eff.type) {
			case "fetched":
				return {
					...state,
					products: {
						items: eff.items,
						fetched: true,
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

			case "add-to-cart":
				return {
					...state,
					cart: state.cart.concat([eff.id]),
				};

			case "remove-from-cart":
				return {
					...state,
					cart: state.cart.filter((id) => id !== eff.id),
				};

			case "open-cart-modal":
				return {
					...state,
					selectedModal: { name: "cart" },
				};
		}
	}
}
