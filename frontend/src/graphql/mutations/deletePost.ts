import { gql } from '@apollo/client';

export const DeletePost = gql`
    mutation ($id: ID!) {
        deletePost(id: $id) {
            success
        }
    }`;
