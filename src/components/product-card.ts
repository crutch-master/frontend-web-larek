import type { Component, Product } from "../types";
import { CDN_URL } from "../utils/constants";
import { formatPrice } from "../utils/price";

export default class ProductCard<
	State extends { products: { items: Product[] } },
	Effect,
> implements Component<State, Effect>
{
	private readonly titleElem: HTMLElement;
	private readonly priceElem: HTMLElement;
	private readonly imageElem: HTMLElement | null;
	private readonly categoryElem: HTMLElement | null;

	constructor(
		elem: HTMLElement,
		public id: string,
	) {
		this.titleElem = elem.querySelector(".card__title")!;
		this.priceElem = elem.querySelector(".card__price")!;
		this.imageElem = elem.querySelector(".card__image");
		this.categoryElem = elem.querySelector(".card__category");
	}

	render(state: State, _: (eff: Effect) => void) {
		const item = state.products.items.find(({ id }) => id === this.id)!;

		this.titleElem.textContent = item.title;
		this.priceElem.textContent = formatPrice(item.price);

		if (this.imageElem !== null) {
			(this.imageElem as HTMLImageElement).src = `${CDN_URL}${item.image}`;
		}

		if (this.categoryElem !== null) {
			this.categoryElem.textContent = item.category;
		}

		return [];
	}
}
