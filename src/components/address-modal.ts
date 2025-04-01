import type { Component, State, Effect } from "../types";
import Button from "./button";
import FormModal from "./form-modal";
import Modal from "./modal";

export default class AddressModal implements Component<State, Effect> {
	private readonly selectOnline: HTMLButtonElement;
	private readonly selectOnRecv: HTMLButtonElement;
	private readonly addrInput: HTMLInputElement;

	private readonly selectOnlineBtn: Button<State, Effect>;
	private readonly selectOnRecvBtn: Button<State, Effect>;
	private readonly form: FormModal<State, Effect>;

	constructor(elem: HTMLElement) {
		this.selectOnline = elem.querySelector(
			"#select-online",
		) as HTMLButtonElement;

		this.selectOnlineBtn = new Button(this.selectOnline, {
			type: "open-address-modal",
			payment: "online",
		});

		this.selectOnRecv = elem.querySelector(
			"#select-on-receive",
		) as HTMLButtonElement;

		this.selectOnRecvBtn = new Button(this.selectOnRecv, {
			type: "open-address-modal",
			payment: "in-person",
		});

		this.addrInput = elem.querySelector("#address-input") as HTMLInputElement;

		this.form = new FormModal(
			elem,
			elem.querySelector(".form")!,
			{ type: "close-modal" },
			{ type: "open-payment-modal", payment: "online", address: "" },
			{ type: "open-address-modal", payment: "online" },
		);
	}

	render(state: State, _: (eff: Effect) => void): Component<State, Effect>[] {
		if (state.selectedModal?.name !== "address") {
			this.form.shown = false;
			return [this.form];
		}

		const [active, inactive] =
			state.form.payment === "online"
				? [this.selectOnline, this.selectOnRecv]
				: [this.selectOnRecv, this.selectOnline];

		active.classList.remove("button_alt");
		inactive.classList.add("button_alt");

		this.form.shown = true;

		this.form.click = {
			type: "open-payment-modal",
			payment: state.form.payment,
			address: this.addrInput.value,
		};

		this.form.update = {
			type: "open-address-modal",
			payment: state.form.payment,
		};

		return [this.selectOnlineBtn, this.selectOnRecvBtn, this.form];
	}
}
