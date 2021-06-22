export interface Review {
	_id: string;
	rating: number;
	content: string;
	published_at: Date;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	author: Author;
	product: Product;
	id: string;
}

interface Author {
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

interface Product {
	gallery: Gallery[];
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
	category: string;
	excerpt: string;
	id: string;
}

interface Cover {
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
	related: string[];
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	id: string;
	previewUrl?: string;
}

interface Formats {
	thumbnail: Large;
	medium: Large;
	small: Large;
	large?: Large;
}

interface Large {
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

enum EXT {
	Jpg = '.jpg',
}

enum MIME {
	ImageJPEG = 'image/jpeg',
}

interface ProviderMetadata {
	public_id: string;
	resource_type: ResourceType;
}

enum ResourceType {
	Image = 'image',
	Video = 'video',
}

interface Gallery {
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
	related: string[];
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	id: string;
}
