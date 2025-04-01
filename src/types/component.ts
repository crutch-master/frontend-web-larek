export interface Component<State, Effect> {
	render(state: State, emit: (eff: Effect) => void): Component<State, Effect>[];
}

export interface App<State, Effect> {
	readonly root: Component<State, Effect>;

	update(state: State, eff: Effect): State;
}
