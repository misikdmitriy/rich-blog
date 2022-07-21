import {
	DeleteOptions,
	Filter,
	FindOneAndUpdateOptions,
	FindOptions,
	InsertOneOptions,
	MongoClient,
	OptionalUnlessRequiredId,
} from 'mongodb';

const {
	MONGO_SCHEME = 'mongodb',
	MONGO_USERNAME,
	MONGO_PASSWORD,
	MONGO_PORT,
	MONGO_DB,
	MONGO_HOSTNAME,
} = process.env;

export const mongoUrl = `${MONGO_SCHEME}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}${MONGO_PORT ? `:${MONGO_PORT}` : ''}?retryWrites=true&writeConcern=majority`;

const client = new MongoClient(mongoUrl, {
	appName: 'rich-blog-be',
	connectTimeoutMS: 10000,
});

const getCollection = async <TType>(collection: string) => {
	await client.connect();

	const database = client.db(MONGO_DB);
	return database.collection<TType>(collection);
};

export const queryOne = async <TType>(
	collection: string,
	filter: Filter<TType> = {},
	options: FindOptions = {}) => {
	const coll = await getCollection<TType>(collection);
	return coll.findOne(filter, options);
};

export const query = async <TType>(
	collection: string,
	filter: Filter<TType> = {},
	options: FindOptions = {}) => {
	const coll = await getCollection<TType>(collection);
	return coll.find(filter, options);
};

export const insert = async <TType>(
	collection: string,
	document: OptionalUnlessRequiredId<TType>,
	options: InsertOneOptions = {},
) => {
	const coll = await getCollection<TType>(collection);
	return coll.insertOne(document, options);
};

export const findOneAndUpdate = async <TType>(
	collection: string,
	document: Partial<TType>,
	filter: Filter<TType> = {},
	options: FindOneAndUpdateOptions = {},
) => {
	const coll = await getCollection<TType>(collection);
	return coll.findOneAndUpdate(filter, { $set: { ...document } }, options);
};

export const deleteOne = async <TType>(
	collection: string,
	filter: Filter<TType> = {},
	options: DeleteOptions = {},
) => {
	const coll = await getCollection<TType>(collection);
	return coll.deleteOne(filter, options);
};
