import { faker } from '@faker-js/faker';

const insert = jest.fn();
const putObject = jest.fn();

jest.mock('../../db', () => ({
    insert: insert
}));

jest.mock('../../aws/s3', () => ({
    putObject: putObject
}));

process.env.POSTS_COLLECTION = faker.random.word();
process.env.CONTENT_BUCKET = faker.random.word();

import create from './create';
import { AppUser } from '../../types/users';

describe('create', () => {
    const post = {
        shortUrl: faker.internet.url(),
        title: faker.word.noun(),
        body: faker.datatype.string(),
        description: faker.random.words(20),
        image: faker.internet.url(),
        imageLabel: faker.word.adjective()
    };

    const user: AppUser = {
        id: faker.database.mongodbObjectId(),
        externalId: faker.datatype.uuid(),
        provider: 'test',
        roles: ['admin'],
        email: faker.internet.email()
    };

    const mongoResult = { acknowledged: true, insertedId: faker.database.mongodbObjectId() };
    const s3Response = {
        $response: {}
    };

    test('should insert to db & put in s3', async () => {
        // arrange
        insert.mockReturnValueOnce(mongoResult);
        putObject.mockReturnValueOnce(s3Response);

        const mongoInsertArg = { 
            shortUrl: post.shortUrl, 
            title: post.title, 
            description: post.description,
            image: post.image,
            imageLabel: post.imageLabel,
        };

        // act
        const result = await create(undefined, { post }, { isAuthenticated: true, user });

        // assert
        expect(result).toMatchObject({...mongoInsertArg, id: mongoResult.insertedId });

        // mongo check
        expect(insert).toBeCalledTimes(1);
        expect(insert).toBeCalledWith(process.env.POSTS_COLLECTION, expect.objectContaining({
            ...mongoInsertArg,
            createdDate: expect.any(Date),
            createdBy: user.id
        }));

        // s3 check
        expect(putObject).toBeCalledTimes(1);
        expect(putObject).toBeCalledWith(process.env.CONTENT_BUCKET, mongoResult.insertedId, post.body);
    });

    test('should stop after failed db insert', async () => {
        // arrange
        const mongoResult = { acknowledged: false };
        insert.mockReturnValueOnce(mongoResult);

        // act
        // assert
        await expect(create(undefined, { post }, { isAuthenticated: true, user }))
            .rejects
            .toThrow();

        // mongo check
        expect(insert).toBeCalledTimes(1);

        // s3 check
        expect(putObject).toBeCalledTimes(0);
    });

    test('should raise error after failed s3 put', async () => {
        // arrange
        insert.mockReturnValueOnce(mongoResult);
        putObject.mockReturnValueOnce(Object.assign(s3Response, { $response: { error: {} } }));

        // act
        // assert
        await expect(create(undefined, { post }, { isAuthenticated: true, user }))
            .rejects
            .toThrow();

        // mongo check
        expect(insert).toBeCalledTimes(1);

        // s3 check
        expect(putObject).toBeCalledTimes(1);
    });

    test('should raise error if unauthenticated', async () => {
        // arrange
        // act
        // assert
        await expect(create(undefined, { post }, { isAuthenticated: false }))
            .rejects
            .toThrow('authentication required');

        // mongo check
        expect(insert).toBeCalledTimes(0);

        // s3 check
        expect(putObject).toBeCalledTimes(0);
    });


    test('should raise error if not admin', async () => {
        // arrange
        // act
        // assert
        await expect(create(undefined, { post }, { isAuthenticated: true, user: Object.assign(user, { roles: ['user'] }) }))
            .rejects
            .toThrow('\'admin\' role required');

        // mongo check
        expect(insert).toBeCalledTimes(0);

        // s3 check
        expect(putObject).toBeCalledTimes(0);
    });
})