export type Component<State, Effect> = {
	selector?: string;
	render: (
		state: State,
		emit: (eff: Effect) => void,
		elem: Element,
	) => Component<State, Effect>[];
};

export type App<State, Effect> = {
	update: (state: State, eff: Effect) => State;
	root: Component<State, Effect>;
};
