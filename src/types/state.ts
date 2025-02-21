import type { Product } from ".";

export type State = {
	products: {
		items: Product[];
		fetched: boolean;
	};
	cart: string[];
	selectedModal:
		| null
		| { name: "product-preview"; id: string }
		| { name: "cart" }
		| { name: "address"; payment: "online" | "on-receive" }
		| { name: "payment" }
		| { name: "complete" };
};
