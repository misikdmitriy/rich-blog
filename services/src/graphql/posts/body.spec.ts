import { faker } from '@faker-js/faker';

process.env.CONTENT_BUCKET = faker.word.noun();

import { ObjectId } from "mongodb";
import body from "./body";

const cache: Record<string, unknown> = {};
const noCacheImpl = (_key: string, itemFactory: () => Promise<unknown>) => itemFactory();
const cacheImpl = (key: string) => Promise.resolve(cache[key]);

const getObject = jest.fn();
const getOrSetAsync = jest.fn();

jest.mock('../../aws/s3', () => {
	return {
		getObject: (bucket: string, key: string) => getObject(bucket, key)
	}
});

jest.mock('../../cache', () => {
	return {
		getOrSetAsync: (key: string, itemFactory: (() => Promise<unknown>)) => getOrSetAsync(key, itemFactory)
	}
});

jest.mock('./common', () => ({
    getKeyByPostId: (id: string | ObjectId) => id.toString()
}));

describe('body', () => {
	test('should call s3', async () => {
		// arrange
		const id = new ObjectId(faker.database.mongodbObjectId());
		const content = faker.datatype.string();
		getOrSetAsync.mockImplementationOnce(noCacheImpl);
		getObject.mockReturnValueOnce({
			$response: {},
			Body: Buffer.from(content)
		});

		// act
		const result = await body({ id });

		// assert
		expect(result).toBe(content);
		expect(getObject).toBeCalledTimes(1);
		expect(getObject).toBeCalledWith(process.env.CONTENT_BUCKET, id.toString());
	});

	test('should throw error', async () => {
		// arrange
		const id = new ObjectId(faker.database.mongodbObjectId());
		getOrSetAsync.mockImplementationOnce(noCacheImpl);
		getObject.mockReturnValueOnce({
			$response: {
				error: {}
			}
		});

		// act
		// assert
		await expect(body({ id }))
			.rejects
			.toThrow();
	});

	test('should use cache', async () => {
		const id = new ObjectId(faker.database.mongodbObjectId());
		const content = faker.datatype.string();
		cache[`${id}.body`] = content;
		getOrSetAsync.mockImplementationOnce(cacheImpl);

		// act
		const result = await body({ id });

		// assert
		expect(result).toBe(content);
		expect(getObject).toBeCalledTimes(0)
	});
});