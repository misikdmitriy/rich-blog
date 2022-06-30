import { gql } from '@apollo/client';

export const PostsQuery = gql`
    query Posts ($pageNum: Int! = 0, $pageSize: Int! = 10) {
        posts (pageNum: $pageNum, pageSize: $pageSize) {
            id
            title
            description
            image
            imageLabel
            createdDate
        }
    }`;
