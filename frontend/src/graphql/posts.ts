import { gql } from '@apollo/client';

export const PostsQuery = gql`
    query ($skip: Int! = 0, $take: Int! = 10, $id: ID) {
        posts (filter: { id: $id }, pagination: { skip: $skip, take: $take }) {
            posts {
                id
                title
                description
                image
                imageLabel
                createdDate
            }
            hasNext
        }
    }`;
