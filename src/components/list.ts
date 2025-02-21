import type { Component } from "../types";
import { cloneTemplate } from "../utils/utils";

export default class List<
	State,
	Effect,
	Arg,
	Factory extends (arg: Arg) => Component<State, Effect>,
> implements Component<State, Effect>
{
	private readonly children: {
		comp: Component<State, Effect>;
		elemId: string;
	}[];

	constructor(
		factory: Factory,
		collection: { arg: Arg; elemId: string }[],
		private readonly templateQuery: string,
		readonly selector?: string,
	) {
		this.children = collection.map(({ arg, elemId }) => ({
			comp: factory(arg),
			elemId,
		}));
	}

	render(
		_state: State,
		_emit: (eff: Effect) => void,
		elem: Element,
	): Component<State, Effect>[] {
		const toRemove = [];

		for (const childElem of elem.children) {
			if (this.children.every((child) => child.elemId !== childElem.id)) {
				toRemove.push(childElem);
			}
		}

		for (const childElem of toRemove) {
			elem.removeChild(childElem);
		}

		return this.children.map(({ comp, elemId }) => {
			if (!elem.querySelector(`#${elemId}`)) {
				const childElem = cloneTemplate(this.templateQuery);
				childElem.id = elemId;
				elem.appendChild(childElem);
			}

			return comp;
		});
	}
}
