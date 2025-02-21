import type { Component, State, Effect } from "../types";
import { cloneTemplate } from "../utils/utils";
import Button from "./button";
import Modal from "./modal";
import ProductCard from "./product-card";

export class CartModal implements Component<State, Effect> {
	selector = "#cart-modal";

	render(
		state: State,
		_: (eff: Effect) => void,
		elem: Element,
	): Component<State, Effect>[] {
		if (state.selectedModal?.name !== "cart") {
			return [new Modal(false, { type: "close-modal" })];
		}

		// this logic can probably be moved elsewhere
		// and shared with the product list
		const list = elem.querySelector(".basket__list")!;
		const toRemove = [];

		for (const child of list.children) {
			const id = child.id.substring(4);

			if (!state.cart.includes(id)) {
				toRemove.push(child);
			}
		}

		toRemove.forEach((child) => list.removeChild(child));

		const total = state.cart.reduce(
			(total, item) => {
				const found = state.products.items.find(({ id }) => id === item)?.price;
				return found && total ? found + total : null;
			},
			0 as number | null,
		);

		elem.querySelector(".basket__price")!.textContent =
			total === null ? "Бесценно" : `${total} синапсов`;

		return [
			new Modal(true, { type: "close-modal" }),

			...state.cart.flatMap((id) => {
				const selector = `#card-${id}`;

				if (list.querySelector(selector) === null) {
					const card = cloneTemplate("#card-basket");
					card.id = `card-${id}`;
					list.appendChild(card);
				}

				return [
					new ProductCard<State, Effect>(id, selector),
					new Button<State, Effect>(
						{ type: "remove-from-cart", id },
						".basket__item-delete",
					),
				];
			}),
		];
	}
}
