import type { Product } from ".";

export type State = {
	products: {
		items: Product[];
		fetched: boolean;
	};
	selectedModal: null | { name: "product-preview"; id: string };
};
