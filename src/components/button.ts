import type { Component } from "../types";

export default class Button<State, Effect> implements Component<State, Effect> {
	constructor(
		private readonly onClick: Effect,
		readonly selector?: string,
	) {}

	render(_: State, emit: (eff: Effect) => void, elem: Element) {
		elem.removeAttribute("disabled");
		(elem as HTMLButtonElement).onclick = () => emit(this.onClick);
		return [];
	}
}
