import type { Component } from "../types";

export default class Button<State, Effect> implements Component<State, Effect> {
	constructor(
		private readonly elem: HTMLElement,
		public onClick: Effect,
		public enabled = true,
	) {}

	render(_: State, emit: (eff: Effect) => void) {
		if (this.enabled) {
			this.elem.removeAttribute("disabled");
			(this.elem as HTMLButtonElement).onclick = () => emit(this.onClick);
		} else {
			this.elem.setAttribute("disabled", "");
			(this.elem as HTMLButtonElement).onclick = null;
		}

		return [];
	}
}
