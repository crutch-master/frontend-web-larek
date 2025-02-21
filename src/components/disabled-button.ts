import type { Component } from "../types";

export default class DisabledButton<State, Effect>
	implements Component<State, Effect>
{
	constructor(readonly selector?: string) {}

	render(_state: State, _emit: (eff: Effect) => void, elem: Element) {
		elem.setAttribute("disabled", "");
		(elem as HTMLButtonElement).onclick = null;
		return [];
	}
}
