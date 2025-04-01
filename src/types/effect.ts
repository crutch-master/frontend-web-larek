import type { FormState, Product } from ".";

export type Effect =
	| { type: "fetched"; items: Product[] }
	| { type: "close-modal" }
	| { type: "open-product-modal"; id: string }
	| { type: "add-to-cart"; id: string }
	| { type: "remove-from-cart"; id: string }
	| { type: "open-cart-modal" }
	| ({ type: "open-address-modal" } & Partial<
			Pick<FormState, "address" | "payment">
	  >)
	| ({ type: "open-payment-modal" } & Partial<FormState>)
	| ({ type: "open-done-modal" } & Partial<FormState>)
	| { type: "order-completed" }
	| { type: "close-done-modal" };
