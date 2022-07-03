let fineOneResult: unknown = undefined;

jest.mock('mongodb', () => ({
	MongoClient: jest.fn().mockImplementation(() => ({
		connect: () => { },

		db: () => ({
			collection: jest.fn().mockImplementation(() => ({
				findOne: () => fineOneResult,
			})),
		}),
	}))
}));

import { queryOne } from './mongo';

describe('queryOne', () => {
	test('should return item', async () => {
		// arrange
		const expected = {};
		fineOneResult = expected;

		// act
		const actual = await queryOne('');

		// assert
		expect(expected).toBe(actual);
	});
});
