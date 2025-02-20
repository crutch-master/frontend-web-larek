import type { State, Effect, Component } from "../types";
import type { Api } from "./base/api";

const ProductList: (api: Api) => Component<State, Effect> = (api) => ({
	selector: ".gallery",

	render(elem, state, emit) {
		if (!state.fetched) {
			(async () => {
				const products = await api.get("/product");
				console.log(products);
				emit({
					type: "fetched",
					products: products as unknown[],
				});
			})();

			return [];
		}

		return [];
	},
});

export default ProductList;
