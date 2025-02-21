import type { State, Effect, Component, Product } from "../types";
import type { Api } from "./base/api";
import Button from "./button";
import Collection from "./collection";
import List from "./list";
import ProductCard from "./product-card";

export default class ProductGallery implements Component<State, Effect> {
	selector = ".gallery";

	constructor(private readonly api: Api) {}

	render(
		state: State,
		emit: (eff: Effect) => void,
		_: Element,
	): Component<State, Effect>[] {
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

		return [
			new List(
				({ product, selector }) =>
					new Collection([
						new ProductCard(product.id, selector),
						new Button(
							{ type: "open-product-modal", id: product.id },
							selector,
						),
					]),

				state.products.items.map((product) => {
					const elemId = `card-${product.id}`;
					return { arg: { product, selector: `#${elemId}` }, elemId };
				}),

				"#card-catalog",
			),
		];
	}
}
