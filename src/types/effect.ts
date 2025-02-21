import type { Product } from ".";

export type Effect =
	| { type: "fetched"; items: Product[] }
	| { type: "close-modal" }
	| { type: "open-product-modal"; id: string }
	| { type: "add-to-cart"; id: string }
	| { type: "remove-from-cart"; id: string }
	| { type: "open-cart-modal" };
