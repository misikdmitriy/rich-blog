export class MongoClient {
	public url: string;

	private static fineOneResult: unknown;

	constructor(url: string) {
		this.url = url;
	}

	// eslint-disable-next-line class-methods-use-this
	public connect() { }

	// eslint-disable-next-line class-methods-use-this
	public db() {
		return {
			collection: jest.fn(() => ({
				findOne: () => MongoClient.fineOneResult,
			})),
		};
	}

	public static setReturn = (result: unknown) => {
		this.fineOneResult = result;
	};
}

export const mongodb = jest.createMockFromModule('mongodb');
export default mongodb;
