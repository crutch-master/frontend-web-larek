import AddressModal from "./components/address-modal";
import type { ILarekAPI } from "./components/base/api";
import { CartButton } from "./components/cart-button";
import { CartModal } from "./components/cart-modal";
import Collection from "./components/collection";
import DoneModal from "./components/done-modal";
import PaymentModal from "./components/payment-modal";
import ProductGallery from "./components/product-gallery";
import ProductModal from "./components/product-modal";
import type { State, Effect, App as IApp } from "./types";

export default class App implements IApp<State, Effect> {
	readonly root;

	constructor(api: ILarekAPI) {
		this.root = new Collection([
			new ProductGallery(document.querySelector(".gallery")!, api),
			new ProductModal(document.querySelector("#product-modal")!),
			new CartModal(document.querySelector("#cart-modal")!),
			new CartButton(document.querySelector(".header__basket")!),
			new AddressModal(document.querySelector("#address-modal")!),
			new PaymentModal(document.querySelector("#payment-modal")!),
			new DoneModal(document.querySelector("#done-modal")!, api),
		]);
	}

	update(state: State, eff: Effect): State {
		switch (eff.type) {
			case "fetched":
				return {
					...state,
					products: {
						items: eff.items,
						fetched: true,
					},
				};

			case "close-modal":
				return {
					...state,
					selectedModal: null,
				};

			case "open-product-modal":
				return {
					...state,
					selectedModal: {
						name: "product-preview",
						id: eff.id,
					},
				};

			case "add-to-cart":
				return {
					...state,
					cart: state.cart.concat([eff.id]),
				};

			case "remove-from-cart":
				return {
					...state,
					cart: state.cart.filter((id) => id !== eff.id),
				};

			case "open-cart-modal":
				return {
					...state,
					selectedModal: { name: "cart" },
				};

			case "open-address-modal":
				return {
					...state,
					form: {
						...state.form,
						payment: eff.payment,
					},
					selectedModal: {
						name: "address",
					},
				};

			case "open-payment-modal":
				return {
					...state,
					form: {
						...state.form,
						address: eff.address,
						payment: eff.payment,
					},
					selectedModal: {
						name: "payment",
					},
				};

			case "open-done-modal":
				return {
					...state,
					form: {
						phone: eff.phone,
						email: eff.email,
						address: eff.address,
						payment: eff.payment,
					},
					selectedModal: { name: "complete", complete: false },
				};

			case "order-completed":
				return {
					...state,
					selectedModal: { name: "complete", complete: true },
				};

			case "close-done-modal":
				return {
					...state,
					cart: [],
					selectedModal: null,
				};
		}
	}
}
