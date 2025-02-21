import type { Component, State, Effect } from "../types";
import FormModal from "./form-modal";

export default class PaymentModal implements Component<State, Effect> {
	readonly selector = "#payment-modal";

	render(state: State, _: (eff: Effect) => void): Component<State, Effect>[] {
		return [
			new FormModal(
				state.selectedModal?.name === "payment",
				{ type: "close-modal" },
				{ type: "open-done-modal" },
				{ type: "open-payment-modal" },
				".form",
			),
		];
	}
}
