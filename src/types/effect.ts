import type { Product } from ".";

export type Effect =
	| { type: "fetched"; items: Product[] }
	| { type: "close-modal" }
	| { type: "open-product-modal"; id: string };
