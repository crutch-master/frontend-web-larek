import type { Product } from ".";

export type Effect =
	| { type: "fetched"; items: Product[] }
	| { type: "rendered" };
