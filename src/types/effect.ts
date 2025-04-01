import type { FormState, Product } from ".";

export type Effect =
	| { type: "fetched"; items: Product[] }
	| { type: "close-modal" }
	| { type: "open-product-modal"; id: string }
	| { type: "add-to-cart"; id: string }
	| { type: "remove-from-cart"; id: string }
	| { type: "open-cart-modal" }
	| ({ type: "open-address-modal" } & Pick<FormState, "payment">)
	| ({ type: "open-payment-modal" } & Pick<FormState, "payment" | "address">)
	| ({ type: "open-done-modal" } & FormState)
	| { type: "order-completed" }
	| { type: "close-done-modal" };
