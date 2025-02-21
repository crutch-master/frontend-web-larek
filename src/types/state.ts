import type { Product } from ".";
import type { Api } from "../components/base/api";

export type State = {
	api: Api;
	products: {
		items: Product[];
		fetched: boolean;
		rendered: boolean; // we don't want them render it more than once
	};
	selectedModal: null | { name: "product-preview"; id: string };
};
