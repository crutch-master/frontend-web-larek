import type { Component } from "../types";
import { cloneTemplate } from "../utils/utils";

export default class List<State, Effect, Arg>
	implements Component<State, Effect>
{
	collection: {
		arg: Arg;
		elemId: string;
	}[] = [];

	constructor(
		private readonly elem: HTMLElement,
		private readonly factory: (arg: Arg) => Component<State, Effect>,
		private readonly templateQuery: string,
	) {}

	render(
		_state: State,
		_emit: (eff: Effect) => void,
	): Component<State, Effect>[] {
		const toRemove = [];

		const children = this.collection.map(({ arg, elemId }) => ({
			arg,
			elemId,
		}));

		for (const childElem of this.elem.children) {
			if (children.every((child) => child.elemId !== childElem.id)) {
				toRemove.push(childElem);
			}
		}

		for (const childElem of toRemove) {
			this.elem.removeChild(childElem);
		}

		return children.map(({ arg, elemId }) => {
			if (this.elem.querySelector(`#${elemId}`) === null) {
				const childElem = cloneTemplate(this.templateQuery);
				childElem.id = elemId;
				this.elem.appendChild(childElem);
			}

			return this.factory(arg);
		});
	}
}
