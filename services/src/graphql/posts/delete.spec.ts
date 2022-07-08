import { faker } from '@faker-js/faker';

import { ObjectId } from 'mongodb';
import { deleteObject } from '../../aws/s3';
import { deleteOne } from '../../db/mongo';
import { mockImplementationOnce, mockReturnValueOnce } from '../../tests/common';

import { AppUser } from '../../types/users';
import { requireAuth } from '../common/auth';
import deletePost from './delete';

jest.mock('../../aws/s3', () => ({
	deleteObject: jest.fn(),
}));

jest.mock('../../db/mongo', () => ({
	deleteOne: jest.fn(),
}));

jest.mock('./common', () => ({
	getKeyByPostId: (id: string | ObjectId) => id.toString(),
}));

jest.mock('../common/auth', () => ({
	requireAuth: jest.fn(),
}));

describe('delete', () => {
	const user: AppUser = {
		id: faker.database.mongodbObjectId(),
		externalId: faker.datatype.uuid(),
		provider: 'test',
		roles: ['admin'],
		email: faker.internet.email(),
	};

	const id = faker.database.mongodbObjectId();

	const mongoResult = { acknowledged: true, deletedCount: 1 };
	const s3Response = {
		$response: {},
	};

	it('should delete from mongo & s3', async () => {
		// arrange
		mockReturnValueOnce(deleteOne, Promise.resolve(mongoResult));
		mockReturnValueOnce(deleteObject, Promise.resolve(s3Response));

		// act
		const result = await deletePost(undefined, { id }, { isAuthenticated: true, user });

		// assert
		expect(result.success).toBe(true);

		// auth
		expect(requireAuth).toBeCalledTimes(1);
		expect(requireAuth).toBeCalledWith(expect.objectContaining({ isAuthenticated: true, user }), 'admin');

		// mongo
		expect(deleteOne).toBeCalledTimes(1);
		expect(deleteOne).toBeCalledWith('posts', expect.objectContaining({
			_id: new ObjectId(id),
		}));

		// s3
		expect(deleteObject).toBeCalledTimes(1);
		expect(deleteObject).toBeCalledWith('', id);
	});

	it('should stop after failed db delete', async () => {
		// arrange
		const mongoFailedResult = { ...mongoResult, acknowledged: false };
		mockReturnValueOnce(deleteOne, Promise.resolve(mongoFailedResult));

		// act
		// assert
		await expect(deletePost(undefined, { id }, { isAuthenticated: true, user }))
			.rejects
			.toThrow('error on delete');

		// mongo
		expect(deleteOne).toBeCalledTimes(1);

		// s3
		expect(deleteObject).toBeCalledTimes(0);
	});

	it('should stop after failed s3 delete', async () => {
		// arrange
		mockReturnValueOnce(deleteOne, Promise.resolve(mongoResult));
		const s3FailedResponse = { $response: { error: {} } };
		mockReturnValueOnce(deleteObject, Promise.resolve(s3FailedResponse));

		// act
		// assert
		await expect(deletePost(undefined, { id }, { isAuthenticated: true, user }))
			.rejects
			.toThrow('error on content delete');

		// mongo
		expect(deleteOne).toBeCalledTimes(1);

		// s3
		expect(deleteObject).toBeCalledTimes(1);
	});

	it('should stop after failed auth', async () => {
		// arrange
		mockImplementationOnce(requireAuth, () => { throw new Error('authentication required'); });

		// act
		// assert
		await expect(deletePost(undefined, { id }, { isAuthenticated: true, user }))
			.rejects
			.toThrow('authentication required');

		// mongo
		expect(deleteOne).toBeCalledTimes(0);

		// s3
		expect(deleteObject).toBeCalledTimes(0);
	});
});
