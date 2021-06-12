import { OrderDetail } from '../../models/Order';

import { CartActionType } from '../action-types';

export interface CartAction {
	type: CartActionType;
	payload: OrderDetail;
}
