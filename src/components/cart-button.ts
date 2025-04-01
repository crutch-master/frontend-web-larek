import type { Component, State, Effect } from "../types";
import Button from "./button";

export class CartButton implements Component<State, Effect> {
	private readonly counter: HTMLElement;
	private readonly btn: Button<State, Effect>;

	constructor(elem: HTMLElement) {
		this.counter = elem.querySelector(".header__basket-counter")!;
		this.btn = new Button(elem, { type: "open-cart-modal" });
	}

	render(state: State, _: (eff: Effect) => void): Component<State, Effect>[] {
		this.counter.textContent = state.cart.length.toString();
		return [this.btn];
	}
}
