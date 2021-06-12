import { combineReducers } from 'redux';
import cartReducer from '../reducers/cartReducers';

const reducers = combineReducers({
	cart: cartReducer,
});

export default reducers;
