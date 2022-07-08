import { queryOne } from './mongo';

let fineOneResult: unknown;

jest.mock('mongodb', () => ({
	MongoClient: jest.fn().mockImplementation(() => ({
		connect: () => { },

		db: () => ({
			collection: jest.fn().mockImplementation(() => ({
				findOne: () => fineOneResult,
			})),
		}),
	})),
}));

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
