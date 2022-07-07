import { gql } from '@apollo/client';

export const PostQuery = gql`
    query ($shortUrl: String!) {
        posts (filter: { shortUrl: $shortUrl }) {
            posts {
                id
                shortUrl
                body
                title
                description
                createdDate
            }
            hasNext
        }
    }`;
