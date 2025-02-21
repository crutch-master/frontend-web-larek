import type { Product } from "../types";

export function formatPrice(price: number | null): string {
	return price === null ? "Бесценно" : `${price} синапсов`;
}

export function calcTotal(all: Product[], selected: string[]) {
	return selected.reduce(
		(total, id) => {
			const found = all.find((item) => item.id === id)?.price ?? null;
			return found !== null && total !== null ? found + total : null;
		},
		0 as number | null,
	);
}
