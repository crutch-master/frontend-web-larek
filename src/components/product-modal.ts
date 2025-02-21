import type { Component, State, Effect } from "../types";
import Modal from "./modal";
import ProductCard from "./product-card";

const ProductModal: Component<State, Effect> = {
	selector: "#product-modal",

	render(state) {
		if (state.selectedModal?.name !== "product-preview") {
			return [new Modal(false, { type: "close-modal" })];
		}

		return [
			new ProductCard<State, Effect>(state.selectedModal.id),
			new Modal<State, Effect>(true, { type: "close-modal" }),
		];
	},
};

export default ProductModal;
