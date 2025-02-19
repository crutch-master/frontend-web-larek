export type Component<State, Effect> =
	| ((state: State, emit: (eff: Effect) => void) => Component<State, Effect>[])
	| {
			selector: string;
			render: (
				elem: Element,
				state: State,
				emit: (eff: Effect) => void,
			) => Component<State, Effect>[];
	  };

export type App<State, Effect> = {
	update: (state: State, eff: Effect) => State;
	root: Component<State, Effect>;
};
