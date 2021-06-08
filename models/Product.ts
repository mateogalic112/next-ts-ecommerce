export interface Product {
	gallery: Cover[];
	_id: string;
	stock: number;
	price: number;
	name: string;
	slug: string;
	description: string;
	published_at: Date;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	cover: Cover;
	video: Cover;
	category: Category;
	reviews: Review[];
	id: string;
	excerpt: string;
}

export interface Category {
	_id: string;
	title: string;
	published_at: Date;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	id: string;
}

export interface Cover {
	_id: string;
	name: string;
	alternativeText: string;
	caption: string;
	hash: string;
	ext: EXT;
	mime: MIME;
	size: number;
	width: number | null;
	height: number | null;
	url: string;
	formats?: Formats;
	provider: string;
	related: string[];
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	id: string;
}

export enum EXT {
	Jpg = '.jpg',
	Mp4 = '.mp4',
	PNG = '.png',
}

export interface Formats {
	thumbnail: Large;
	large?: Large;
	medium?: Large;
	small?: Large;
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
}

export enum MIME {
	ImageJPEG = 'image/jpeg',
	ImagePNG = 'image/png',
	VideoMp4 = 'video/mp4',
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
