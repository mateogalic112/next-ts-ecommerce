export interface User {
	jwt: string;
	user: UserClass;
}

export interface UserClass {
	confirmed: boolean;
	blocked: boolean;
	_id: string;
	username: string;
	email: string;
	provider: string;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	role: Role;
	reviews: Review[];
	id: string;
}

export interface Review {
	_id: string;
	rating: number;
	content: string;
	published_at: Date;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	author: string;
	product: string;
	id: string;
}

export interface Role {
	_id: string;
	name: string;
	description: string;
	type: string;
	__v: number;
	id: string;
}
