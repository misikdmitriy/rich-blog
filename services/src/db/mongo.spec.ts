import { queryOne } from './mongo';
import { MongoClient } from './__mocks__/mongodb';

jest.mock('mongodb');

describe('queryOne', () => {
	test('should return item', async () => {
		// arrange
		const expected = {};
		MongoClient.setReturn(expected);

		// act
		const actual = await queryOne('');

		// assert
		expect(expected).toBe(actual);
	});
});
