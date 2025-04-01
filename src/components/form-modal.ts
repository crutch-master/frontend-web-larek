import type { Component } from "../types";
import Button from "./button";
import Modal from "./modal";

export default class FormModal<State, Effect>
	implements Component<State, Effect>
{
	private readonly modal: Modal<State, Effect>;
	private readonly submitBtn: Button<State, Effect>;

	constructor(
		modalElem: HTMLElement,
		private readonly formElem: HTMLFormElement,
		close: Effect,
		public click: Effect,
		public update: Effect,
		public shown = false,
	) {
		this.modal = new Modal(modalElem, close, shown);
		this.submitBtn = new Button(
			formElem.querySelector(".modal__actions")!.querySelector(".button")!,
			click,
		);
	}

	render(_: State, emit: (eff: Effect) => void): Component<State, Effect>[] {
		let isFilled = true;

		for (const elem of this.formElem.elements) {
			if (elem.tagName !== "INPUT") {
				continue;
			}

			(elem as HTMLInputElement).oninput = () => emit(this.update);

			if ((elem as HTMLInputElement).value.length === 0) {
				isFilled = false;
				break;
			}
		}

		this.formElem.onsubmit = (e) => e.preventDefault();

		this.modal.shown = this.shown;
		this.submitBtn.enabled = isFilled;
		this.submitBtn.onClick = this.click;

		return [this.modal, this.submitBtn];
	}
}
