import type { Component } from "../types";
import Button from "./button";

const Modal: <State, Effect>(
	shown: boolean,
	close: Effect,
	selector?: string,
) => Component<State, Effect> = (shown, close, selector = undefined) => ({
	selector,

	render(_, emit, elem) {
		if (shown) {
			elem.classList.add("modal_active");
		} else {
			elem.classList.remove("modal_active");
		}

		(elem as HTMLDivElement).onclick = (evt) => {
			if (evt.target === elem) {
				emit(close);
			}
		};

		return [Button(close, ".modal__close")];
	},
});

export default Modal;
