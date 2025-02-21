import type { Component, Product } from "../types";
import { CDN_URL } from "../utils/constants";
import { formatPrice } from "../utils/price";

export default class ProductCard<
	State extends { products: { items: Product[] } },
	Effect,
> implements Component<State, Effect>
{
	constructor(
		private readonly id: string,
		readonly selector?: string,
	) {}

	render(state: State, _: (eff: Effect) => void, elem: Element) {
		const item = state.products.items.find(({ id }) => id === this.id)!;

		elem.querySelector(".card__title")!.textContent = item.title;
		elem.querySelector(".card__price")!.textContent = formatPrice(item.price);

		const image = elem.querySelector(".card__image");
		if (image !== null) {
			(image as HTMLImageElement).src = `${CDN_URL}${item.image}`;
		}

		const category = elem.querySelector(".card__category");
		if (category !== null) {
			category.textContent = item.category;
		}

		return [];
	}
}
