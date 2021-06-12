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
			return {
				...state,
				cartItems: [...state.cartItems, item],
			};
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
