import type { Product } from ".";

export type FormState = {
	payment: "online" | "in-person";
	address: string;
	phone: string;
	email: string;
};

export type State = {
	products: {
		items: Product[];
		fetched: boolean;
	};
	cart: string[];
	form: FormState;
	selectedModal:
		| null
		| { name: "product-preview"; id: string }
		| { name: "cart" }
		| { name: "address" }
		| { name: "payment" }
		| { name: "complete"; complete: boolean };
};
