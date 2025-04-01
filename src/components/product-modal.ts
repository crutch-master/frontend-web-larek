import type { Component, State, Effect } from "../types";
import Button from "./button";
import Modal from "./modal";
import ProductCard from "./product-card";

export default class ProductModal implements Component<State, Effect> {
	private readonly modal: Modal<State, Effect>;
	private readonly card: ProductCard<State, Effect>;
	private readonly addToCartBtn: Button<
		State,
		{ type: "add-to-cart"; id: string }
	>;

	constructor(elem: HTMLElement) {
		this.modal = new Modal(elem, { type: "close-modal" });
		this.card = new ProductCard(elem, "");
		this.addToCartBtn = new Button(elem.querySelector(".button")!, {
			type: "add-to-cart",
			id: "",
		});
	}

	render(
		state: State,
		_emit: (eff: Effect) => void,
	): Component<State, Effect>[] {
		if (state.selectedModal?.name !== "product-preview") {
			this.modal.shown = false;
			return [this.modal];
		}

		const id = state.selectedModal.id;
		const isInCart = state.cart.includes(id);

		this.modal.shown = true;
		this.card.id = id;
		this.addToCartBtn.enabled = !isInCart;
		this.addToCartBtn.onClick.id = id;

		return [this.modal, this.card, this.addToCartBtn];
	}
}
