import type { Api } from "./components/base/api";
import ProductList from "./components/product-list";
import ProductModal from "./components/product-modal";
import type { State, Effect, App as IApp, Component } from "./types";

class AppComponent implements Component<State, Effect> {
	constructor(
		private readonly list: ProductList,
		private readonly productModal: ProductModal,
	) {}

	render(_state: State, _emit: (eff: Effect) => void, _elem: Element) {
		return [this.list, this.productModal];
	}
}

export default class App implements IApp<State, Effect> {
	readonly root;

	constructor(api: Api) {
		this.root = new AppComponent(new ProductList(api), new ProductModal());
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
		}
	}
}
