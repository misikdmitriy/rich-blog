import { gql } from '@apollo/client';

export const PostByShortUrlQuery = gql`
    query ($shortUrl: String!) {
        posts (filter: { shortUrl: $shortUrl }) {
            posts {
                id
                shortUrl
                content
                title
                description
                createdDate
            }
        }
    }`;

export const PostByIdQuery = gql`
    query ($id: ID!) {
        posts (filter: { id: $id }) {
            posts {
                id
                title
                shortUrl
                description
                content
                image
                imageLabel
            }
        }
    }`;
