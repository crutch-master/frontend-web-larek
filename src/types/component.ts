export interface Component<State, Effect> {
	readonly selector?: string;

	render(
		state: State,
		emit: (eff: Effect) => void,
		elem: Element,
	): Component<State, Effect>[];
}

export interface App<State, Effect> {
	readonly root: Component<State, Effect>;

	update(state: State, eff: Effect): State;
}
