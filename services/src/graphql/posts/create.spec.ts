import { faker } from '@faker-js/faker';

import { ObjectId } from 'mongodb';
import create from './create';
import { AppUser } from '../../types/users';
import { insert } from '../../db';
import { mockImplementationOnce, mockReturnValueOnce } from '../../tests/common';
import { requireAuth } from '../common/auth';

jest.mock('../../db', () => ({
	insert: jest.fn(),
}));

jest.mock('../common/auth', () => ({
	requireAuth: jest.fn(),
}));

describe('create', () => {
	const post = {
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
		acknowledged: true,
		insertedId: new ObjectId(faker.database.mongodbObjectId()),
	};

	test('should insert to db', async () => {
		// arrange
		mockReturnValueOnce(insert, Promise.resolve(mongoResult));

		const mongoInsertArg = {
			content: post.content,
			shortUrl: post.shortUrl,
			title: post.title,
			description: post.description,
			image: post.image,
			imageLabel: post.imageLabel,
		};

		// act
		const result = await create(undefined, { post }, { isAuthenticated: true, user });

		// assert
		expect(result).toMatchObject({ ...mongoInsertArg, id: mongoResult.insertedId });

		// auth
		expect(requireAuth).toBeCalledTimes(1);
		expect(requireAuth).toBeCalledWith(expect.objectContaining({ isAuthenticated: true, user }), 'admin');

		// mongo check
		expect(insert).toBeCalledTimes(1);
		expect(insert).toBeCalledWith('posts', expect.objectContaining({
			...mongoInsertArg,
			availableFor: ['admin'],
			createdDate: expect.any(Date),
			createdBy: user.id,
		}));
	});

	test('should stop after failed db insert', async () => {
		// arrange
		const mongoFailResult = { acknowledged: false };
		mockReturnValueOnce(insert, Promise.resolve(mongoFailResult));

		// act
		// assert
		await expect(create(undefined, { post }, { isAuthenticated: true, user }))
			.rejects
			.toThrow('error on save');

		// mongo check
		expect(insert).toBeCalledTimes(1);
	});

	test('should raise error if unauthenticated', async () => {
		// arrange
		mockImplementationOnce(requireAuth, () => { throw new Error('authentication required'); });

		// act
		// assert
		await expect(create(undefined, { post }, { isAuthenticated: false }))
			.rejects
			.toThrow('authentication required');

		// mongo check
		expect(insert).toBeCalledTimes(0);
	});
});
