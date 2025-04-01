import type { Component, State, Effect } from "../types";
import { calcTotal, formatPrice } from "../utils/price";
import type { ILarekAPI } from "./base/api";
import Button from "./button";
import Modal from "./modal";

export default class DoneModal implements Component<State, Effect> {
	readonly selector = "#done-modal";

	constructor(private readonly api: ILarekAPI) {}

	render(
		state: State,
		emit: (eff: Effect) => void,
		elem: Element,
	): Component<State, Effect>[] {
		if (state.selectedModal?.name === "complete") {
			const total = elem.querySelector(".film__description") as HTMLElement;
			if (state.selectedModal.complete) {
				total.textContent = `Списано ${formatPrice(calcTotal(state.products.items, state.cart))}`;
			} else {
				(async () => {
					await this.api.sendOrder(
						state.form.payment,
						state.form.email,
						state.form.phone,
						state.form.address,
						state.cart,
						calcTotal(state.products.items, state.cart) ?? 0,
					);
					emit({ type: "order-completed" });
				})();

				total.textContent = "Оплачиваем...";
			}
		}

		return [
			new Modal(state.selectedModal?.name === "complete", {
				type: "close-done-modal",
			}),
			new Button({ type: "close-done-modal" }, ".order-success__close"),
		];
	}
}
