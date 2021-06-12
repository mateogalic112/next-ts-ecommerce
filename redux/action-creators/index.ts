import { Dispatch } from 'redux';
import { Product } from '../../models/Order';
import { CartActionType } from '../action-types';
import { CartAction } from '../actions';

export const addToCart = (product: Product, quantity: number) => (dispatch: Dispatch<CartAction>, getState: any) => {
	dispatch({
		type: CartActionType.CART_ADD_ITEM,
		payload: { product, quantity },
	});

	localStorage.setItem('cartItems', JSON.stringify(getState().cartItems));
};
