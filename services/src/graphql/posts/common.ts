import { ObjectId } from 'mongodb';

export const getKeyByPostId = (id: string | ObjectId) => `${id}.json`;
