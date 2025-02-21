import type { Component, State, Effect } from "../types";
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

		return [
			new ProductCard<State, Effect>(state.selectedModal.id),
			new Modal<State, Effect>(true, { type: "close-modal" }),
		];
	}
}
