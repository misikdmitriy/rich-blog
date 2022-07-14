import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';
import { query } from '../../db';
import { AppUser } from '../../types/users';
import all from './all';

const sort = jest.fn();
const skip = jest.fn();
const limit = jest.fn();
const map = jest.fn();
const toArray = jest.fn();

jest.mock('../../db', () => ({
	query: jest.fn().mockImplementation(() => {
		const obj: Record<string, unknown> = {
			sort: sort.mockImplementationOnce(() => obj),
			skip: skip.mockImplementationOnce(() => obj),
			limit: limit.mockImplementationOnce(() => obj),
			map: map.mockImplementationOnce(() => obj),
			toArray: toArray.mockImplementationOnce(() => Promise.resolve([])),
		};

		return Promise.resolve(obj);
	}),
}));

interface FilterPostsInput {
	id?: string
	shortUrl?: string
}

interface PaginationInput {
	skip: number,
	take: number
}

describe('all', () => {
	test.each([
		[
			1,
			{ id: faker.database.mongodbObjectId(), shortUrl: '2' },
			{ skip: 3, take: 4 },
		],
		[
			2,
			{ shortUrl: '2' },
			{ skip: 5, take: 6 },
		],
		[
			3,
			{ id: faker.database.mongodbObjectId() },
			{ skip: 7, take: 10 },
		],
		[
			4,
			{ id: faker.database.mongodbObjectId() },
			undefined,
		],
		[
			5,
			undefined,
			{ skip: 5, take: 15 },
		],
		[
			6,
			undefined,
			{ take: 15 },
		],
		[
			6,
			undefined,
			{ take: 500 },
		],
		[
			7,
			undefined,
			{ skip: 20 },
		],
		[
			8,
			undefined,
			undefined,
		],
	] as [number, FilterPostsInput?, PaginationInput?][])(
		'all should return correct data %s',
		async (_id, filter, pagination) => {
			// arrange
			const expectedFilter: Record<string, unknown> = {};
			if (filter?.id) {
				expectedFilter._id = new ObjectId(filter.id);
			}

			if (filter?.shortUrl) {
				expectedFilter.shortUrl = filter.shortUrl;
			}

			// act
			await all(undefined, { filter, pagination }, { isAuthenticated: false });

			// assert
			expect(query).toBeCalledTimes(1);
			expect(query).toBeCalledWith(
				'posts',
				expect.objectContaining({
					...expectedFilter,
					availableFor: { $in: ['user'] },
				}),
			);

			expect(sort).toBeCalledTimes(1);
			expect(sort).toBeCalledWith(expect.objectContaining({
				createdDate: -1,
			}));

			expect(skip).toBeCalledTimes(1);
			expect(skip).toBeCalledWith(pagination?.skip || 0);

			expect(limit).toBeCalledTimes(1);
			const take = pagination?.take || 10;
			expect(limit).toBeCalledWith(take > 100 ? 100 : take);

			expect(map).toBeCalledTimes(1);

			expect(toArray).toBeCalledTimes(1);
		},
	);

	it('all should return correct data for required role', async () => {
		// arrange
		const user: AppUser = {
			id: faker.database.mongodbObjectId(),
			externalId: faker.datatype.uuid(),
			provider: 'test',
			roles: ['admin'],
			email: faker.internet.email(),
		};

		// act
		await all(undefined, {}, { isAuthenticated: false, user });

		// assert
		expect(query).toBeCalledWith(
			'posts',
			expect.objectContaining({
				availableFor: { $in: ['admin', 'user'] },
			}),
		);
	});
});
