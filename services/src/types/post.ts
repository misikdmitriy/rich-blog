import { WithId } from 'mongodb';

export type PostNoBody = {
	shortUrl: string
	title: string
	description: string
	image: string
	imageLabel: string
	createdDate: Date
	createdBy: string
}

export type Post = PostNoBody & {
	body: string
}

export type PostDocument = WithId<PostNoBody>;
