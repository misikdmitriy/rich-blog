import { WithId } from 'mongodb';

export type PostNoBody = {
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
