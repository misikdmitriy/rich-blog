import { gql } from '@apollo/client';

export const PostsQuery = gql`
    query Posts ($skip: Int! = 0, $take: Int! = 10, $id: ID) {
        posts (filter: { id: $id }, pagination: { skip: $skip, take: $take }) {
            id
            title
            description
            image
            imageLabel
            createdDate
        }
    }`;
