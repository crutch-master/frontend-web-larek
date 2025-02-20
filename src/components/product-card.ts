import type { Component, Effect, State } from "../types";
import { CDN_URL } from "../utils/constants";

const ProductCard: (id: string) => Component<State, Effect> = (id) => ({
	selector: `#product-card-${id}`,

	render(elem, state, _) {
		const item = state.products.items.find((product) => product.id === id)!;

		elem.querySelector(".card__category")!.textContent = item.category;
		elem.querySelector(".card__title")!.textContent = item.title;
		elem.querySelector(".card__price")!.textContent =
			item.price === null ? "Бесценно" : `${item.price} синапсов`;
		(elem.querySelector(".card__image") as HTMLImageElement).src =
			`${CDN_URL}${item.image}`;

		return [];
	},
});

export default ProductCard;
