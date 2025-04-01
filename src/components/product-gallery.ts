import type { State, Effect, Component, Product } from "../types";
import type { ILarekAPI } from "./base/api";
import Button from "./button";
import Collection from "./collection";
import List from "./list";
import ProductCard from "./product-card";

export default class ProductGallery implements Component<State, Effect> {
	private readonly list: List<
		State,
		Effect,
		{ product: Product; selector: string }
	>;

	constructor(
		elem: HTMLElement,
		private readonly api: ILarekAPI,
	) {
		this.list = new List(
			elem,

			({ product, selector }) =>
				new Collection([
					new ProductCard(elem.querySelector(selector)!, product.id),
					new Button(elem.querySelector(selector)!, {
						type: "open-product-modal",
						id: product.id,
					}),
				]),

			"#card-catalog",
		);
	}

	render(
		state: State,
		emit: (eff: Effect) => void,
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

		this.list.collection = state.products.items.map((product) => {
			const elemId = `card-${product.id}`;
			return { arg: { product, selector: `#${elemId}` }, elemId };
		});

		return [this.list];
	}
}
