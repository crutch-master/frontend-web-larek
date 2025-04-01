import type { Component, State, Effect } from "../types";
import { calcTotal, formatPrice } from "../utils/price";
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

		elem.querySelector(".basket__price")!.textContent = formatPrice(
			calcTotal(state.products.items, state.cart),
		);

		return [
			new Modal(true, { type: "close-modal" }),

			new Collection(
				[
					new Button(
						{ type: "open-address-modal", email: "", payment: "online" },
						".button",
						state.cart.length > 0,
					),
				],
				".modal__actions",
			),

			new List(
				({ id, selector }) =>
					new Collection(
						[
							new ProductCard<State, Effect>(id),
							new Button<State, Effect>(
								{ type: "remove-from-cart", id },
								".basket__item-delete",
							),
						],
						selector,
					),

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
