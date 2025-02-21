import type { Component } from "../types";
import Button from "./button";

export default class Modal<State, Effect> implements Component<State, Effect> {
	constructor(
		private readonly shown: boolean,
		private readonly close: Effect,
		readonly selector?: string,
	) {}

	render(_: State, emit: (eff: Effect) => void, elem: Element) {
		if (this.shown) {
			elem.classList.add("modal_active");
		} else {
			elem.classList.remove("modal_active");
		}

		(elem as HTMLDivElement).onclick = (evt) => {
			if (evt.target === elem) {
				emit(this.close);
			}
		};

		return [new Button(this.close, ".modal__close")];
	}
}
