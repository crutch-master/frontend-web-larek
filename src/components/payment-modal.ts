import type { Component, State, Effect } from "../types";
import FormModal from "./form-modal";

export default class PaymentModal implements Component<State, Effect> {
	readonly selector = "#payment-modal";

	render(
		state: State,
		_: (eff: Effect) => void,
		elem: HTMLElement,
	): Component<State, Effect>[] {
		const emailInput = elem.querySelector("#email") as HTMLInputElement;
		const phoneInput = elem.querySelector("#phone-number") as HTMLInputElement;

		return [
			new FormModal(
				state.selectedModal?.name === "payment",
				{ type: "close-modal" },
				{
					type: "open-done-modal",
					email: emailInput.value,
					phone: phoneInput.value,
				},
				{
					type: "open-payment-modal",
					email: emailInput.value,
					phone: phoneInput.value,
				},
				".form",
			),
		];
	}
}
