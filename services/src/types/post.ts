import { WithId } from 'mongodb';

export type Post = {
	title: string
	description: string
	image: string
	imageLabel: string
	body: string
	createdDate: Date
	createdBy: string
}

export type PostDocument = WithId<Post>;
