import type { App, Component } from "./types";

function render<S, E>(
	root: Element,
	component: Component<S, E>,
	state: S,
	emit: (eff: E) => void,
) {
	const selected = component.selector
		? root.querySelector(component.selector)
		: root;

	if (selected === null) {
		throw new Error(
			`failed to find html element ${
				typeof component === "function"
					? ""
					: ` with selector: ${component.selector}`
			}`,
		);
	}

	const children = component.render(state, emit, selected);

	for (const child of children) {
		render(selected, child, state, emit);
	}
}

export function start<S, E>(
	app: App<S, E>,
	initial: S,
	root: Element = document.body,
) {
	let state = initial;
	let queuedRerender = false;

	// In case emit is called during the render just calling
	// render inside of it would cause unpredictable results
	// since the first render isn't complete yet.
	//
	// With this implementation it's pushed into microtask
	// queue and will be called only when the stack becomes empty,
	// which happes only after the rendering is complete so
	// nothing should break.
	//
	// To optimise this a bit we keep track of queued renders so
	// that after multiple effects were fired during the render
	// only one render will take place after it.
	//
	// This solution is a bit wacky but it works. And I'm too lazy
	// to invent a whole runtime for this effect stuff all in JS
	// when we can outsource this to the engine.
	//
	// Long live javascript async runtime.
	const emit = (eff: E) => {
		state = app.update(state, eff);

		if (!queuedRerender) {
			queueMicrotask(() => {
				queuedRerender = false;
				render(root, app.root, state, emit);
			});

			queuedRerender = true;
		}
	};

	render(root, app.root, state, emit);
}
