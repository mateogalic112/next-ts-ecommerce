import { Product } from './Product';

export interface Order {
	status: string;
	_id: string;
	total: number;
	checkout_session: string;
	published_at: Date;
	order_details: OrderDetail[];
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	customer: Customer;
	id: string;
}

export interface Customer {
	confirmed: boolean;
	blocked: boolean;
	_id: string;
	username: string;
	email: string;
	provider: string;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	role: string;
	id: string;
}

export interface OrderDetail {
	readonly _id?: string;
	quantity: number;
	readonly __v?: number;
	product: Product;
	readonly id?: string;
}
