# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
bun install
bun start
```

## Сборка

```
bun build
```

# Архитектура

Использована архитектура MVU (Model View Update). Основная идея состоит в том, что наше приложение состоит из трех основных частей.

## Состояние

Состояние приложения, на основе которого отображается интерфейс. Важно, что состояние в этом случае оно глобальное на все приложение. В нашем случае состояние приложения описывается следующим типом:
```ts
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
```

где `Product` описывает продукт:

```ts
export type Product = {
	id: string;
	title: string;
	description: string;
	category: string;
	image: string;
	price: number | null;
};
```

## Компонент

Концептуально компонент это функция `f :: state -> ui`. Единственной задачей компонента является отрисовка на основе состояния. Компонент не может напрямую влиять на состояние, благодаря чему код значительно легче воспринимаеть и отлаживать. В нашем случае для удобства работы с селекторами компонент описывается интерфейсом, а не просто функцией:
```ts
export interface Component<State, Effect> {
	readonly selector?: string;

	render(
		state: State,
		emit: (eff: Effect) => void,
		elem: Element,
	): Component<State, Effect>[];
}
```

## Эффект

Приложение имеет специальную функцию `update :: state -> effect -> state`, которая на основе эффекта обновляет состояние. Эффект может быть вызван как изнутри компонента напрямую, так и изнутри какого-то listener-а, который компонент навесил на странице с помощью передаваемой в компонент функции `emit`. Как только это происходит вызвается функция `update`, после чего начинается процесс переотрисовки на основе нового состояния. В нашем случае эффект описывается следующим типом:
```ts
export type Effect =
	| { type: "fetched"; items: Product[] }
	| { type: "close-modal" }
	| { type: "open-product-modal"; id: string }
	| { type: "add-to-cart"; id: string }
	| { type: "remove-from-cart"; id: string }
	| { type: "open-cart-modal" }
	| { type: "open-address-modal"; payment?: "online" | "on-receive" }
	| { type: "open-payment-modal" }
	| { type: "open-done-modal" }
	| { type: "close-done-modal" };
```

А `update` является частью интерфейса приложения:
```ts
export interface App<State, Effect> {
	readonly root: Component<State, Effect>;

	update(state: State, eff: Effect): State;
}
```

Для визуализации данной архитектуры также существует наглядная диаграмма. На ней widgets эквивалентна компонентам, а interactions эффектам.

![](https://book.iced.rs/resources/the-gui-trinity.svg)

*Диаграмма взята из [документации](https://book.iced.rs/architecture.html) библиотеки [iced.rs](https://iced.rs)*
