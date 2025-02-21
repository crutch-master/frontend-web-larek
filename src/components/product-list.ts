import type { State, Effect, Component, Product } from "../types";
import { cloneTemplate } from "../utils/utils";
import type { Api } from "./base/api";
import Button from "./button";
import ProductCard from "./product-card";

export default class ProductList implements Component<State, Effect> {
	selector = ".gallery";

	constructor(private readonly api: Api) {}

	render(
		state: State,
		emit: (eff: Effect) => void,
		elem: Element,
	): Component<State, Effect>[] {
		if (state.products.rendered) {
			return [];
		}

		if (!state.products.fetched) {
			(async () => {
				const products = await this.api.get("/product");
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
				new ProductCard(item.id, `#${id}`),
				new Button({ type: "open-product-modal", id: item.id }, `#${id}`),
			];
		});
	}
}
