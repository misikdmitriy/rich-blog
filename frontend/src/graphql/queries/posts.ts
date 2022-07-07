import { gql } from '@apollo/client';

export const PostsQuery = gql`
    query ($skip: Int! = 0, $take: Int! = 10) {
        posts (pagination: { skip: $skip, take: $take }) {
            posts {
                id
                shortUrl
                title
                description
                image
                imageLabel
                createdDate
            }
            hasNext
        }
    }`;
