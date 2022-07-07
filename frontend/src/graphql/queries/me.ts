import { gql } from '@apollo/client';

export const Me = gql`
    query {
        me {
            isAuthenticated
            user {
                roles
            }
        }
    }`;
