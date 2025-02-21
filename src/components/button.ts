import type { Component } from "../types";

const Button: <State, Effect>(
	onClick: Effect,
	selector: string | undefined,
) => Component<State, Effect> = (onClick, selector = undefined) => ({
	selector,

	render(_, emit, elem) {
		(elem as HTMLButtonElement).onclick = () => emit(onClick);
		return [];
	},
});

export default Button;
