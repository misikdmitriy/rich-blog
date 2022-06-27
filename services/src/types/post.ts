import { WithId } from 'mongodb';

export type Post = {
	name: string
	body: string
	createdDate: Date
	createdBy: string
}

export type PostDocument = WithId<Post>;
