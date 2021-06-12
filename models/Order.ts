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

export interface Product {
	gallery: Gallery[];
	_id: string;
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
	id: string;
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
	formats?: CoverFormats;
	provider: string;
	related: string[];
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	id: string;
	previewUrl?: string;
}

export interface CoverFormats {
	thumbnail: Thumbnail;
}

export interface Thumbnail {
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
	PNG = '.png',
}

export enum MIME {
	ImageJPEG = 'image/jpeg',
	ImagePNG = 'image/png',
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
	formats: GalleryFormats;
	provider: string;
	related: string[];
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	id: string;
}

export interface GalleryFormats {
	thumbnail: Thumbnail;
	large?: Thumbnail;
	medium?: Thumbnail;
	small?: Thumbnail;
}
