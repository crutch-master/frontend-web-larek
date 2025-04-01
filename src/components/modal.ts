import type { Component } from "../types";
import Button from "./button";

export default class Modal<State, Effect> implements Component<State, Effect> {
	private readonly closeBtn: Button<State, Effect>;

	constructor(
		private readonly elem: Element,
		private readonly close: Effect,
		public shown = false,
	) {
		this.closeBtn = new Button(elem.querySelector(".modal__close")!, close);
	}

	render(_: State, emit: (eff: Effect) => void) {
		if (this.shown) {
			this.elem.classList.add("modal_active");
		} else {
			this.elem.classList.remove("modal_active");
		}

		(this.elem as HTMLDivElement).onclick = (evt) => {
			if (evt.target === this.elem) {
				emit(this.close);
			}
		};

		return [this.closeBtn];
	}
}
