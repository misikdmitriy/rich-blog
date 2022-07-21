import { WithId } from 'mongodb';

export type Post = {
	shortUrl: string
	title: string
	description: string
	image: string
	imageLabel: string
	createdDate: Date
	updatedDate?: Date
	createdBy: string
	updatedBy?: string
	availableFor: string[]
	content: Record<string, unknown>
}

export type PostDocument = WithId<Post>;
