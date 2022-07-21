/* eslint global-require: 0 */

import { faker } from '@faker-js/faker';
import { AppUser } from '../../types/users';

describe('requireAuth', () => {
	beforeEach(() => {
		jest.resetModules();
		process.env.ALLOW_ANONYMOUS = 'false';
	});

	it('should check and pass', () => {
		// arrange
		const isAuthenticated = true;
		const user: AppUser = {
			id: faker.database.mongodbObjectId(),
			externalId: faker.datatype.uuid(),
			provider: 'test',
			roles: ['admin'],
			email: faker.internet.email(),
		};

		const { requireAuth } = require('./auth');

		// act
		// assert
		expect(() => requireAuth({ isAuthenticated, user }, 'admin'))
			.not
			.toThrow();
	});

	it('should throw auth required', () => {
		// arrange
		const isAuthenticated = false;
		const user: AppUser = {
			id: faker.database.mongodbObjectId(),
			externalId: faker.datatype.uuid(),
			provider: 'test',
			roles: ['admin'],
			email: faker.internet.email(),
		};

		const { requireAuth } = require('./auth');

		// act
		// assert
		expect(() => requireAuth({ isAuthenticated, user }, 'admin'))
			.toThrow('authentication required');
	});

	it('should throw role required', () => {
		// arrange
		const isAuthenticated = true;
		const user: AppUser = {
			id: faker.database.mongodbObjectId(),
			externalId: faker.datatype.uuid(),
			provider: 'test',
			roles: ['user'],
			email: faker.internet.email(),
		};

		const { requireAuth } = require('./auth');

		// act
		// assert
		expect(() => requireAuth({ isAuthenticated, user }, 'admin'))
			.toThrow('at least one role required: \'admin\'');
	});

	it('should check and pass if at least one role present', () => {
		// arrange
		const isAuthenticated = true;
		const user: AppUser = {
			id: faker.database.mongodbObjectId(),
			externalId: faker.datatype.uuid(),
			provider: 'test',
			roles: ['admin'],
			email: faker.internet.email(),
		};

		const { requireAuth } = require('./auth');

		// act
		// assert
		expect(() => requireAuth({ isAuthenticated, user }, 'user', 'admin'))
			.not
			.toThrow();
	});

	it('should throw if no roles', () => {
		// arrange
		const isAuthenticated = true;
		const user: AppUser = {
			id: faker.database.mongodbObjectId(),
			externalId: faker.datatype.uuid(),
			provider: 'test',
			roles: [],
			email: faker.internet.email(),
		};

		const { requireAuth } = require('./auth');

		// act
		// assert
		expect(() => requireAuth({ isAuthenticated, user }, 'user', 'admin'))
			.toThrow('at least one role required: \'user, admin\'');
	});

	it('should skip validation if env variable set to true', () => {
		// arrange
		process.env.ALLOW_ANONYMOUS = 'true';

		const { requireAuth } = require('./auth');

		// act
		// assert
		expect(() => requireAuth({ isAuthenticated: false }, 'admin'))
			.not
			.toThrow();
	});
});
