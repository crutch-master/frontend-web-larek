import type { Component, State, Effect } from "../types";
import { calcTotal, formatPrice } from "../utils/price";
import Button from "./button";
import Modal from "./modal";

export default class DoneModal implements Component<State, Effect> {
	readonly selector = "#done-modal";

	render(
		state: State,
		_: (eff: Effect) => void,
		elem: Element,
	): Component<State, Effect>[] {
		(elem.querySelector(".film__description") as HTMLElement).textContent =
			`Списано ${formatPrice(calcTotal(state.products.items, state.cart))}`;

		return [
			new Modal(state.selectedModal?.name === "complete", {
				type: "close-done-modal",
			}),
			new Button({ type: "close-done-modal" }, ".order-success__close"),
		];
	}
}
