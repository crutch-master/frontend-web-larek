import type { Component, State, Effect } from "../types";
import { calcTotal, formatPrice } from "../utils/price";
import type { ILarekAPI } from "./base/api";
import Button from "./button";
import Modal from "./modal";

export default class DoneModal implements Component<State, Effect> {
	private readonly total: HTMLElement;
	private readonly modal: Modal<State, Effect>;
	private readonly closeBtn: Button<State, Effect>;

	constructor(
		elem: HTMLElement,
		private readonly api: ILarekAPI,
	) {
		this.total = elem.querySelector(".film__description")!;

		this.modal = new Modal(elem, {
			type: "close-done-modal",
		});

		this.closeBtn = new Button(elem.querySelector(".order-success__close")!, {
			type: "close-done-modal",
		});
	}

	render(
		state: State,
		emit: (eff: Effect) => void,
	): Component<State, Effect>[] {
		if (state.selectedModal?.name === "complete") {
			if (state.selectedModal.complete) {
				this.total.textContent = `Списано ${formatPrice(calcTotal(state.products.items, state.cart))}`;
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

				this.total.textContent = "Оплачиваем...";
			}
		}

		this.modal.shown = state.selectedModal?.name === "complete";

		return [this.modal, this.closeBtn];
	}
}
