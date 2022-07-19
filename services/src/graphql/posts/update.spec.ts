import { faker } from '@faker-js/faker';

import { ObjectId } from 'mongodb';
import update from './update';
import { AppUser } from '../../types/users';
import { findOneAndUpdate } from '../../db';
import { mockImplementationOnce, mockReturnValueOnce } from '../../tests/common';
import { requireAuth } from '../common/auth';

jest.mock('../../db', () => ({
	findOneAndUpdate: jest.fn(),
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

	it('should update both in mongo', async () => {
		// arrange
		mockReturnValueOnce(findOneAndUpdate, mongoResult);

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
			content: post.content,
			description: post.description,
			image: post.image,
			imageLabel: post.imageLabel,
			updatedBy: user.id,
			updatedDate: expect.any(Date),
		}), expect.objectContaining({
			_id: new ObjectId(id),
		}));
	});

	it('should make available for users', async () => {
		// arrange
		mockReturnValueOnce(findOneAndUpdate, mongoResult);

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
	});
});
