import phone from "phone";
import type { Component, State, Effect } from "../types";
import FormModal from "./form-modal";

export default class PaymentModal implements Component<State, Effect> {
	private readonly emailInput: HTMLInputElement;
	private readonly phoneInput: HTMLInputElement;
	private readonly form: FormModal<State, Effect>;

	constructor(elem: HTMLElement) {
		this.emailInput = elem.querySelector("#email") as HTMLInputElement;
		this.phoneInput = elem.querySelector("#phone-number") as HTMLInputElement;

		this.form = new FormModal(
			elem,
			elem.querySelector(".form")!,
			{ type: "close-modal" },
			{ type: "open-payment-modal", address: "", payment: "online" },
			{
				type: "open-done-modal",
				address: "",
				payment: "online",
				email: "",
				phone: "",
			},
		);
	}

	render(state: State, _: (eff: Effect) => void): Component<State, Effect>[] {
		this.form.shown = state.selectedModal?.name === "payment";

		this.form.update = {
			type: "open-payment-modal",
			address: state.form.address,
			payment: state.form.payment,
		};

		if (!phone(this.phoneInput.value).isValid) {
			this.form.click = this.form.update;
		} else {
			this.form.click = {
				type: "open-done-modal",
				address: state.form.address,
				payment: state.form.payment,
				email: this.emailInput.value,
				phone: this.phoneInput.value,
			};
		}

		return [this.form];
	}
}
