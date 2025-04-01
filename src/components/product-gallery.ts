import type { State, Effect, Component } from "../types";
import type { ILarekAPI } from "./base/api";
import Button from "./button";
import Collection from "./collection";
import List from "./list";
import ProductCard from "./product-card";

export default class ProductGallery implements Component<State, Effect> {
	selector = ".gallery";

	constructor(private readonly api: ILarekAPI) {}

	render(
		state: State,
		emit: (eff: Effect) => void,
		_: Element,
	): Component<State, Effect>[] {
		if (!state.products.fetched) {
			(async () => {
				const items = await this.api.fetchProducts();
				emit({
					type: "fetched",
					items,
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
