import type { Component, State, Effect } from "../types";
import Button from "./button";
import Collection from "./collection";
import List from "./list";
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

		const total = state.cart.reduce(
			(total, id) => {
				const found =
					state.products.items.find((item) => item.id === id)?.price ?? null;

				return found !== null && total !== null ? found + total : null;
			},
			0 as number | null,
		);

		elem.querySelector(".basket__price")!.textContent =
			total === null ? "Бесценно" : `${total} синапсов`;

		return [
			new Modal(true, { type: "close-modal" }),

			new List(
				({ id, selector }) =>
					new Collection([
						new ProductCard<State, Effect>(id, selector),
						new Button<State, Effect>(
							{ type: "remove-from-cart", id },
							".basket__item-delete",
						),
					]),

				state.cart.map((id) => {
					const elemId = `card-${id}`;
					return { arg: { id, selector: `#${elemId}` }, elemId };
				}),

				"#card-basket",
				".basket__list",
			),
		];
	}
}
