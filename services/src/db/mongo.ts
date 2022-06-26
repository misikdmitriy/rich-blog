import {
	Filter, FindOptions, InsertOneOptions, MongoClient,
} from 'mongodb';

const {
	MONGO_SCHEME = 'mongodb',
	MONGO_USERNAME,
	MONGO_PASSWORD,
	MONGO_PORT,
	MONGO_DB,
	MONGO_HOSTNAME,
} = process.env;

const client = new MongoClient(`${MONGO_SCHEME}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}${MONGO_PORT ? `:${MONGO_PORT}` : ''}?retryWrites=true&writeConcern=majority`, {
	appName: 'rich-blog-be',
	connectTimeoutMS: 10000,
});

export const queryOne = async <TType>(
	collection: string,
	filter: Filter<TType> = {},
	options: FindOptions = {}) => {
	await client.connect();

	const database = client.db(MONGO_DB);
	const coll = database.collection<TType>(collection);

	return coll.findOne(filter, options);
};

export const query = async <TType>(
	collection: string,
	filter: Filter<TType> = {},
	options: FindOptions = {}) => {
	await client.connect();

	const database = client.db(MONGO_DB);
	const coll = database.collection<TType>(collection);

	return coll.find(filter, options);
};

export const insert = async <TType>(
	collection: string,
	document: TType,
	options: InsertOneOptions = {},
) => {
	await client.connect();

	const database = client.db(MONGO_DB);
	const coll = database.collection(collection);

	return coll.insertOne(document, options);
};
