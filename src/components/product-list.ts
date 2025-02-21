import type { State, Effect, Component, Product } from "../types";
import { cloneTemplate } from "../utils/utils";
import Button from "./button";
import ProductCard from "./product-card";

const ProductList: Component<State, Effect> = {
	selector: ".gallery",

	render(state, emit, elem) {
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

		emit({ type: "products-rendered" });

		while (elem.lastChild) {
			elem.removeChild(elem.lastChild);
		}

		return state.products.items.flatMap((item) => {
			const id = `product-card-${item.id}`;
			const card = cloneTemplate("#card-catalog");

			card.id = id;
			elem.appendChild(card);

			return [
				ProductCard(item.id, `#${id}`),
				Button({ type: "open-product-modal", id: item.id }, `#${id}`),
			];
		});
	},
};

export default ProductList;
