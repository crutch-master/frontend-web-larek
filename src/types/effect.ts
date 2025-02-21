import type { Product } from ".";

export type Effect =
	| { type: "fetched"; items: Product[] }
	| { type: "close-modal" }
	| { type: "open-product-modal"; id: string }
	| { type: "add-to-cart"; id: string }
	| { type: "remove-from-cart"; id: string }
	| { type: "open-cart-modal" }
	| { type: "open-address-modal"; payment?: "online" | "on-receive" }
	| { type: "open-payment-modal" }
	| { type: "open-done-modal" }
	| { type: "close-done-modal" };
