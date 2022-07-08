import { faker } from '@faker-js/faker';

import { ObjectId } from 'mongodb';
import { getObject } from '../../aws/s3';
import { getOrSetAsync } from '../../cache';
import { mockReturnValueOnce } from '../../tests/common';
import content from './content';

jest.mock('../../aws/s3', () => ({
	getObject: jest.fn(),
}));

jest.mock('../../cache', () => ({
	getOrSetAsync: jest.fn().mockImplementation((
		_key: string,
		itemFactory: () => Promise<unknown>,
	): Promise<unknown> => itemFactory()),
}));

jest.mock('./common', () => ({
	getKeyByPostId: (id: string | ObjectId) => id.toString(),
}));

describe('content', () => {
	test('should call s3', async () => {
		// arrange
		const id = new ObjectId(faker.database.mongodbObjectId());
		const body = faker.datatype.string();
		mockReturnValueOnce(getObject, Promise.resolve({
			$response: {},
			Body: Buffer.from(body),
		}));

		// act
		const result = await content({ id });

		// assert
		expect(result).toBe(body);
		expect(getOrSetAsync).toBeCalledTimes(1);
		expect(getOrSetAsync).toBeCalledWith(`${id}.content`, expect.anything(), expect.anything());
		expect(getObject).toBeCalledTimes(1);
		expect(getObject).toBeCalledWith('', id.toString());
	});

	test('should throw error', async () => {
		// arrange
		const id = new ObjectId(faker.database.mongodbObjectId());
		mockReturnValueOnce(getObject, {
			$response: {
				error: {},
			},
		});

		// act
		// assert
		await expect(content({ id }))
			.rejects
			.toThrow('cannot get content');
		expect(getOrSetAsync).toBeCalledTimes(1);
	});
});
