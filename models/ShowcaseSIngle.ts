export interface ShowcaseSingle {
	_id: string;
	published_at: Date;
	Carousel: Carousel[];
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	id: string;
}

export interface Carousel {
	_id: string;
	title: string;
	__v: number;
	slide: Slide;
	id: string;
}

export interface Slide {
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

export enum EXT {
	Jpg = '.jpg',
}

export interface Formats {
	thumbnail: Large;
	large: Large;
	medium: Large;
	small: Large;
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

export enum MIME {
	ImageJPEG = 'image/jpeg',
}

export interface ProviderMetadata {
	public_id: string;
	resource_type: ResourceType;
}

export enum ResourceType {
	Image = 'image',
}
