import type { State, Effect, Component, Product } from "../types";
import { cloneTemplate } from "../utils/utils";
import ProductCard from "./product-card";

const ProductList: Component<State, Effect> = {
	selector: ".gallery",

	render(elem, state, emit) {
		if (state.products.rendered) {
			return [];
		}

		if (!state.products.fetched) {
			(async () => {
				const products = await state.api.get("/product");
				emit({
					type: "fetched",
					items: (products as { items: Product[] }).items,
				});
			})();

			return [];
		}

		emit({ type: "rendered" });

		while (elem.lastChild) {
			elem.removeChild(elem.lastChild);
		}

		return state.products.items.map((item) => {
			const id = `product-card-${item.id}`;
			const card = cloneTemplate("#card-catalog");

			card.id = id;
			elem.appendChild(card);

			return ProductCard(item.id);
		});
	},
};

export default ProductList;
