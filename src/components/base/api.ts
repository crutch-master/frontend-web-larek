import type { Product } from "../../types";

export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export class Api {
	readonly baseUrl: string;
	protected options: RequestInit;

	constructor(baseUrl: string, options: RequestInit = {}) {
		this.baseUrl = baseUrl;
		this.options = {
			headers: {
				"Content-Type": "application/json",
				...((options.headers as object) ?? {}),
			},
		};
	}

	protected handleResponse(response: Response): Promise<object> {
		if (response.ok) return response.json();
		else
			return response
				.json()
				.then((data) => Promise.reject(data.error ?? response.statusText));
	}

	get(uri: string) {
		return fetch(this.baseUrl + uri, {
			...this.options,
			method: "GET",
		}).then(this.handleResponse);
	}

	post(uri: string, data: object, method: ApiPostMethods = "POST") {
		return fetch(this.baseUrl + uri, {
			...this.options,
			method,
			body: JSON.stringify(data),
		}).then(this.handleResponse);
	}
}

export interface ILarekAPI {
	fetchProducts(): Promise<Product[]>;
	sendOrder(
		payment: string,
		email: string,
		phone: string,
		address: string,
		items: string[],
		total: number,
	): Promise<unknown>;
}

export class LarekAPI implements ILarekAPI {
	constructor(private readonly api: Api) {}

	async fetchProducts(): Promise<Product[]> {
		const data = await this.api.get("/product");
		return (data as { items: Product[] }).items;
	}

	sendOrder(
		payment: string,
		email: string,
		phone: string,
		address: string,
		items: string[],
		total: number,
	): Promise<unknown> {
		const data = {
			payment,
			email,
			phone,
			address,
			items,
			total,
		};
		return this.api.post("/order", data);
	}
}
