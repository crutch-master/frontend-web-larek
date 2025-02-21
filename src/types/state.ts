import type { Product } from ".";

export type State = {
	products: {
		items: Product[];
		fetched: boolean;
		rendered: boolean; // we don't want them render it more than once
	};
	selectedModal: null | { name: "product-preview"; id: string };
};
