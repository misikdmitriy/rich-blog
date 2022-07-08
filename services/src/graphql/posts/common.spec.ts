import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';
import { getKeyByPostId } from './common';

describe('getKeyByPostId', () => {
    it.each([
        ['123'],
        [new ObjectId(faker.database.mongodbObjectId())]
    ])('should return correct id %s', (id) => {
        // act
        // arrange
        // assert
        expect(getKeyByPostId(id)).toBe(`${id}.json`);
    })
})