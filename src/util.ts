import type { App, Component } from "./types";

function render<S, M>(
	root: Element,
	component: Component<S, M>,
	state: S,
	emit: (msg: M) => void,
) {
	const selected =
		typeof component === "function"
			? root
			: root.querySelector(component.selector);

	if (selected === null) {
		throw new Error(
			`failed to find html element ${
				typeof component === "function"
					? ""
					: ` with selector: ${component.selector}`
			}`,
		);
	}

	const children =
		typeof component === "function"
			? component(state, emit)
			: component.render(selected, state, emit);

	for (const child of children) {
		render(selected, child, state, emit);
	}
}

export function start<S, M>(
	app: App<S, M>,
	initial: S,
	root: Element = document.body,
) {
	let state = initial;

	const emit = (msg: M) => {
		state = app.update(state, msg);
		render(root, app.root, state, emit);
	};

	render(root, app.root, state, emit);
}
