import type { Component, State, Effect } from "../types";
import Button from "./button";
import Modal from "./modal";
import ProductCard from "./product-card";

export default class ProductModal implements Component<State, Effect> {
	readonly selector = "#product-modal";

	render(
		state: State,
		_emit: (eff: Effect) => void,
		_elem: Element,
	): Component<State, Effect>[] {
		if (state.selectedModal?.name !== "product-preview") {
			return [new Modal(false, { type: "close-modal" })];
		}

		const id = state.selectedModal.id;
		const isInCart = state.cart.includes(id);

		return [
			new ProductCard(state.selectedModal.id),
			new Modal(true, { type: "close-modal" }),
			new Button(
				{ type: "add-to-cart", id: state.selectedModal.id },
				".button",
				!isInCart,
			),
		];
	}
}
