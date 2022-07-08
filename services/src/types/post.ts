import { WithId } from 'mongodb';

export type PostNoContent = {
	shortUrl: string
	title: string
	description: string
	image: string
	imageLabel: string
	createdDate: Date
	createdBy: string
}

export type Post = PostNoContent & {
	content: Record<string, unknown>
}

export type PostDocument = WithId<PostNoContent>;
