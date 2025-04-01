import type { Component } from "../types";

export default class Collection<State, Effect>
	implements Component<State, Effect>
{
	constructor(private readonly children: Component<State, Effect>[]) {}

	render(_state: State, _emit: (eff: Effect) => void) {
		return this.children;
	}
}
