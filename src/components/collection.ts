import type { Component } from "../types";

export default class Collection<State, Effect>
	implements Component<State, Effect>
{
	constructor(
		private readonly children: Component<State, Effect>[],
		readonly selector?: string,
	) {}

	render(_state: State, _emit: (eff: Effect) => void, _elem: Element) {
		return this.children;
	}
}
