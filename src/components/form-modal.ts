import type { Component } from "../types";
import Button from "./button";
import Collection from "./collection";
import Modal from "./modal";

export default class FormModal<State, Effect>
	implements Component<State, Effect>
{
	constructor(
		private readonly shown: boolean,
		private readonly close: Effect,
		private readonly click: Effect,
		private readonly update: Effect,
		private readonly formSelector: string,
		readonly selector?: string,
	) {}

	render(
		_: State,
		emit: (eff: Effect) => void,
		elem: Element,
	): Component<State, Effect>[] {
		const form = elem.querySelector(this.formSelector) as HTMLFormElement;
		form.onsubmit = (e) => e.preventDefault();

		let isFilled = true;

		for (const elem of form.elements) {
			if (elem.tagName !== "INPUT") {
				continue;
			}

			(elem as HTMLInputElement).oninput = () => emit(this.update);

			if ((elem as HTMLInputElement).value.length === 0) {
				isFilled = false;
				break;
			}
		}

		return [
			new Modal(this.shown, this.close),
			new Collection(
				[new Button(this.click, ".button", isFilled)],
				".modal__actions",
			),
		];
	}
}
