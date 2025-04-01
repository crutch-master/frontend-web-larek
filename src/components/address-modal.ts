import type { Component, State, Effect } from "../types";
import Button from "./button";
import FormModal from "./form-modal";
import Modal from "./modal";

export default class AddressModal implements Component<State, Effect> {
	readonly selector = "#address-modal";

	render(
		state: State,
		_: (eff: Effect) => void,
		elem: Element,
	): Component<State, Effect>[] {
		if (state.selectedModal?.name !== "address") {
			return [new Modal(false, { type: "close-modal" })];
		}

		const onlineBtn = elem.querySelector("#select-online") as HTMLButtonElement;
		const onRecvBtn = elem.querySelector(
			"#select-on-receive",
		) as HTMLButtonElement;

		const [active, inactive] =
			state.form.payment === "online"
				? [onlineBtn, onRecvBtn]
				: [onRecvBtn, onlineBtn];

		active.classList.remove("button_alt");
		inactive.classList.add("button_alt");

		const addrInput = elem.querySelector("#address-input") as HTMLInputElement;

		return [
			new Button(
				{ type: "open-address-modal", payment: "online" },
				"#select-online",
			),
			new Button(
				{ type: "open-address-modal", payment: "in-person" },
				"#select-on-receive",
			),
			new FormModal(
				true,
				{ type: "close-modal" },
				{ type: "open-payment-modal", address: addrInput.value },
				{ type: "open-address-modal", address: addrInput.value },
				".form",
			),
		];
	}
}
