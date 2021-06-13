import { OrderDetail } from '../../models/Order';

import { CartActionType } from '../action-types';

import { CartAction } from '../actions';

interface CartState {
	cartItems: OrderDetail[];
}

const initialState = {
	cartItems: [],
};

const cartReducer = (state: CartState = initialState, action: CartAction): CartState => {
	const item = action.payload;

	switch (action.type) {
		case CartActionType.CART_ADD_ITEM:
			const itemInCart = state.cartItems.find((x) => x.product.name === item.product.name);

			if (!!itemInCart) {
				return {
					...state,
					cartItems: state.cartItems.map((x) => (x.product.name === itemInCart.product.name ? item : x)),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}
		case CartActionType.CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter((cartItem) => cartItem.id !== item.id),
			};
		case CartActionType.CART_RESET_ITEMS:
			return initialState;
		default:
			return state;
	}
};

export default cartReducer;
