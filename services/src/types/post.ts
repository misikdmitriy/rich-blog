import { WithId } from 'mongodb';

export type Post = {
	name: string,
	body: string
	createdDate: Date
}

export type PostDocument = WithId<Post>;
