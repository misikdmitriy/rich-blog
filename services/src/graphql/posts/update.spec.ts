import { faker } from '@faker-js/faker';

import { ObjectId } from 'mongodb';
import update from './update';
import { AppUser } from '../../types/users';
import { findOneAndUpdate } from '../../db';
import { mockImplementationOnce, mockReturnValueOnce } from '../../tests/common';
import { putObject } from '../../aws/s3';
import { requireAuth } from '../common/auth';

jest.mock('../../db', () => ({
	findOneAndUpdate: jest.fn(),
}));

jest.mock('../../aws/s3', () => ({
	putObject: jest.fn(),
}));

jest.mock('./common', () => ({
	getKeyByPostId: (id: string | ObjectId) => id.toString(),
}));

jest.mock('../common/auth', () => ({
	requireAuth: jest.fn(),
}));

describe('update', () => {
	const id = faker.database.mongodbObjectId();

	const post = {
		_id: id,
		shortUrl: faker.internet.url(),
		title: faker.word.noun(),
		content: {},
		description: faker.random.words(20),
		image: faker.internet.url(),
		imageLabel: faker.word.adjective(),
	};

	const user: AppUser = {
		id: faker.database.mongodbObjectId(),
		externalId: faker.datatype.uuid(),
		provider: 'test',
		roles: ['admin'],
		email: faker.internet.email(),
	};

	const mongoResult = {
		ok: true,
		value: post,
	};

	const s3Response = {
		$response: {
			error: undefined,
		},
	};

	it('should update both in mongo & s3', async () => {
		// arrange
		mockReturnValueOnce(findOneAndUpdate, mongoResult);
		mockReturnValueOnce(putObject, s3Response);

		// act
		const result = await update(
			undefined,
			{ id, post },
			{ isAuthenticated: true, user },
		);

		// assert
		expect(result).toMatchObject({ success: true, post: expect.objectContaining({ id }) });
		expect(requireAuth).toBeCalledTimes(1);

		// mongo
		expect(findOneAndUpdate).toBeCalledTimes(1);
		expect(findOneAndUpdate).toBeCalledWith('posts', expect.objectContaining({
			shortUrl: post.shortUrl,
			title: post.title,
			description: post.description,
			image: post.image,
			imageLabel: post.imageLabel,
			updatedBy: user.id,
			updatedDate: expect.any(Date),
		}), expect.objectContaining({
			_id: new ObjectId(id),
		}));

		// s3
		expect(putObject).toBeCalledTimes(1);
		expect(putObject).toBeCalledWith(
			'',
			id,
			JSON.stringify(post.content),
		);
	});

	it('should update only in db if no content provided', async () => {
		// arrange
		mockReturnValueOnce(findOneAndUpdate, mongoResult);

		// act
		const result = await update(
			undefined,
			{
				id,
				post: {},
			},
			{ isAuthenticated: true, user },
		);

		// assert
		expect(result).toMatchObject({ success: true, post: expect.objectContaining({ id }) });
		expect(requireAuth).toBeCalledTimes(1);

		// mongo
		expect(findOneAndUpdate).toBeCalledTimes(1);

		// s3
		expect(putObject).toBeCalledTimes(0);
	});

	it('should make available for users', async () => {
		// arrange
		mockReturnValueOnce(findOneAndUpdate, mongoResult);
		mockReturnValueOnce(putObject, s3Response);

		// act
		await update(
			undefined,
			{ id, post: { ...post, availableToUsers: true } },
			{ isAuthenticated: true, user },
		);

		// assert
		// mongo
		expect(findOneAndUpdate).toBeCalledTimes(1);
		expect(findOneAndUpdate).toBeCalledWith('posts', expect.objectContaining({
			availableFor: ['admin', 'user'],
		}), expect.objectContaining({
			_id: new ObjectId(id),
		}));

		// s3
		expect(putObject).toBeCalledTimes(1);
	});

	it('should stop after failed db update', async () => {
		// arrange
		mockReturnValueOnce(findOneAndUpdate, { ok: false });

		// act
		await expect(() => update(
			undefined,
			{ id, post },
			{ isAuthenticated: true, user },
		))
			.rejects
			.toThrow('error on update');

		// assert
		// mongo
		expect(findOneAndUpdate).toBeCalledTimes(1);

		// s3
		expect(putObject).toBeCalledTimes(0);
	});

	it('should return unsuccessful result if there is nothing in db', async () => {
		// arrange
		mockReturnValueOnce(findOneAndUpdate, { ok: true, value: undefined });

		// act
		const result = await update(
			undefined,
			{ id, post },
			{ isAuthenticated: true, user },
		);

		// assert
		expect(result).toMatchObject({ success: false });

		// mongo
		expect(findOneAndUpdate).toBeCalledTimes(1);

		// s3
		expect(putObject).toBeCalledTimes(0);
	});

	it('should stop after failed s3 update', async () => {
		// arrange
		mockReturnValueOnce(findOneAndUpdate, mongoResult);
		mockReturnValueOnce(putObject, { $response: { error: true } });

		// act
		await expect(() => update(
			undefined,
			{ id, post },
			{ isAuthenticated: true, user },
		))
			.rejects
			.toThrow('error on content update');

		// assert
		// mongo
		expect(findOneAndUpdate).toBeCalledTimes(1);

		// s3
		expect(putObject).toBeCalledTimes(1);
	});

	it('should stop after auth', async () => {
		// arrange
		mockImplementationOnce(requireAuth, () => { throw new Error('auth required'); });

		// act
		await expect(() => update(
			undefined,
			{ id, post },
			{ isAuthenticated: true, user },
		))
			.rejects
			.toThrow('auth required');

		// assert
		// mongo
		expect(findOneAndUpdate).toBeCalledTimes(0);

		// s3
		expect(putObject).toBeCalledTimes(0);
	});
});
