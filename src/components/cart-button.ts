import type { Component, State, Effect } from "../types";
import Button from "./button";

export class CartButton implements Component<State, Effect> {
	selector = ".header__basket";

	render(
		state: State,
		_: (eff: Effect) => void,
		elem: Element,
	): Component<State, Effect>[] {
		elem.querySelector(".header__basket-counter")!.textContent =
			state.cart.length.toString();

		return [new Button({ type: "open-cart-modal" })];
	}
}
