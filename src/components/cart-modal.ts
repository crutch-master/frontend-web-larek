import type { Component, State, Effect } from "../types";
import { calcTotal, formatPrice } from "../utils/price";
import Button from "./button";
import Collection from "./collection";
import List from "./list";
import Modal from "./modal";
import ProductCard from "./product-card";

export class CartModal implements Component<State, Effect> {
	private readonly modal: Modal<State, Effect>;
	private readonly priceElem: HTMLElement;
	private readonly nextBtn: Button<State, Effect>;
	private readonly list: List<State, Effect, { id: string; selector: string }>;

	constructor(elem: HTMLElement) {
		this.modal = new Modal(elem, { type: "close-modal" });

		this.priceElem = elem.querySelector(".basket__price")!;

		this.nextBtn = new Button(
			elem.querySelector(".modal__actions")!.querySelector(".button")!,
			{ type: "open-address-modal", payment: "online" },
			false,
		);

		this.list = new List(
			elem.querySelector(".basket__list")!,

			({ id, selector }) =>
				new Collection([
					new ProductCard<State, Effect>(elem.querySelector(selector)!, id),
					new Button<State, Effect>(
						elem
							.querySelector(selector)!
							.querySelector(".basket__item-delete")!,
						{
							type: "remove-from-cart",
							id,
						},
					),
				]),

			"#card-basket",
		);
	}

	render(state: State, _: (eff: Effect) => void): Component<State, Effect>[] {
		if (state.selectedModal?.name !== "cart") {
			this.modal.shown = false;
			return [this.modal];
		}

		this.priceElem.textContent = formatPrice(
			calcTotal(state.products.items, state.cart),
		);
		this.modal.shown = true;
		this.nextBtn.enabled = state.cart.length > 0;
		this.list.collection = state.cart.map((id) => {
			const elemId = `card-${id}`;
			return { arg: { id, selector: `#${elemId}` }, elemId };
		});

		return [this.modal, this.nextBtn, this.list];
	}
}
