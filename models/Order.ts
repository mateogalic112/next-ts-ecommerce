export interface Order {
	status: string;
	products: Product[];
	_id: string;
	total: number;
	checkout_session: string;
	published_at: Date;
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

export interface Product {
	gallery: Gallery[];
	_id: ID;
	name: string;
	slug: string;
	price: number;
	stock: number;
	description: string;
	published_at: Date;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	cover: Cover;
	video: Cover;
	category: string;
	excerpt: string;
	id: ID;
}

export enum ID {
	The60Bf2B3Acc231A0690Deda14 = '60bf2b3acc231a0690deda14',
	The60Bf2E25Cc231A0690Deda32 = '60bf2e25cc231a0690deda32',
}

export interface Cover {
	_id: string;
	name: string;
	alternativeText: string;
	caption: string;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	width: number | null;
	height: number | null;
	url: string;
	provider_metadata: ProviderMetadata;
	formats?: Formats;
	provider: string;
	related: ID[];
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	id: string;
	previewUrl?: string;
}

export interface Formats {
	thumbnail: Large;
	medium?: Large;
	small?: Large;
	large?: Large;
}

export interface Large {
	name: string;
	hash: string;
	ext: EXT;
	mime: MIME;
	width: number;
	height: number;
	size: number;
	path: null;
	url: string;
	provider_metadata: ProviderMetadata;
}

export enum EXT {
	Jpg = '.jpg',
}

export enum MIME {
	ImageJPEG = 'image/jpeg',
}

export interface ProviderMetadata {
	public_id: string;
	resource_type: ResourceType;
}

export enum ResourceType {
	Image = 'image',
	Video = 'video',
}

export interface Gallery {
	_id: string;
	name: string;
	alternativeText: string;
	caption: string;
	hash: string;
	ext: EXT;
	mime: MIME;
	size: number;
	width: number;
	height: number;
	url: string;
	provider_metadata: ProviderMetadata;
	formats: Formats;
	provider: string;
	related: ID[];
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	id: string;
}
