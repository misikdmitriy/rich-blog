const data: Record<string, Array<unknown>> = {};

jest.mock('../../db', () => ({
	query: jest.fn().mockImplementation(<TType extends Record<string, unknown>>(collection: string,
		filter: Filter<TType> = {}) => {
		let coll = (data[collection] ?? []) as TType[];

		for (const [key, value] of Object.entries(filter)) {
			coll = coll.filter(x => {
				const val = x[key];
				return val instanceof ObjectId 
					? val.equals(value) 
					: val === value;
			});
		}

		type Mapper = (elem: unknown) => unknown;

		class Cursor {
			constructor(private collection: unknown[]) { }

			sort(): Cursor { return this }

			skip(count: number): Cursor {
				this.collection = this.collection.slice(count);
				return this;
			}

			limit(count: number): Cursor {
				this.collection = this.collection.slice(0, count);
				return this;
			}

			map(func: Mapper): Cursor {
				this.collection = this.collection.map(func);
				return this;
			}

			toArray(): Promise<unknown[]> {
				return Promise.resolve(this.collection);
			}
		}

		return Promise.resolve(new Cursor(coll));
	})
}));

const collectionName = 'test_posts';
process.env.POSTS_COLLECTION = collectionName;

import all from './all';
import { Filter, ObjectId } from 'mongodb';

describe('all', () => {
	test.each([
		[
			0,
			[{
				a: 1
			}],
			{},
			{ skip: 0, take: 2 },
			false,
			[{
				a: 1
			}],
		],
		[
			1,
			[{
				_id: new ObjectId('62c1728b726af773b749b909'),
				b: 2
			}, {
				_id: new ObjectId('62c1728b726af773b749b900'),
				b: 2
			}],
			{ id: '62c1728b726af773b749b900' },
			{ skip: 0, take: 2 },
			false,
			[{
				_id: new ObjectId('62c1728b726af773b749b900'),
				b: 2,
				id: new ObjectId('62c1728b726af773b749b900')
			}],
		],
		[
			2,
			[{
				shortUrl: 'shortUrl1'
			}, {
				shortUrl: 'shortUrl2'
			}],
			{ shortUrl: 'shortUrl2' },
			{ skip: 0, take: 2 },
			false,
			[{
				shortUrl: 'shortUrl2'
			}],
		],
		[
			3,
			[{
				shortUrl: 'shortUrl1'
			}, {
				shortUrl: 'shortUrl2'
			}, {
				shortUrl: 'shortUrl1'
			}, {
				shortUrl: 'shortUrl3'
			}, {
				shortUrl: 'shortUrl1'
			}],
			{ shortUrl: 'shortUrl1' },
			{ skip: 1, take: 2 },
			true,
			[{
				shortUrl: 'shortUrl1'
			}, {
				shortUrl: 'shortUrl1'
			}],
		]
	])(
		'all should return correct data (id %i)',
		async (_id, collection, filter, pagination, hasNext, posts) => {
			// arrange
			data[collectionName] = collection;

			// act
			const result = await all(undefined, { filter, pagination });

			// assert
			expect(result).toEqual({ hasNext, posts });
		},
	);
});
