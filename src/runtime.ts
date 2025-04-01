import type { App, Component } from "./types";

function render<S, E>(
	component: Component<S, E>,
	state: S,
	emit: (eff: E) => void,
) {
	const children = component.render(state, emit);

	for (const child of children) {
		render(child, state, emit);
	}
}

export function start<S, E>(app: App<S, E>, initial: S) {
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
				render(app.root, state, emit);
			});

			queuedRerender = true;
		}
	};

	render(app.root, state, emit);
}
