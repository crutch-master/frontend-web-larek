import type { Component } from "../types";

export default class Button<State, Effect> implements Component<State, Effect> {
	constructor(
		private readonly onClick: Effect,
		readonly selector?: string,
		private readonly enabled: boolean = true,
	) {}

	render(_: State, emit: (eff: Effect) => void, elem: Element) {
		if (this.enabled) {
			elem.removeAttribute("disabled");
			(elem as HTMLButtonElement).onclick = () => emit(this.onClick);
		} else {
			elem.setAttribute("disabled", "");
			(elem as HTMLButtonElement).onclick = null;
		}

		return [];
	}
}
