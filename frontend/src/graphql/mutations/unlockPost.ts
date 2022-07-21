import { gql } from '@apollo/client';

export const UnlockPost = gql`
	mutation($id: ID!, $availableToUsers: Boolean! = true) {
		updatePost(id: $id, post: { availableToUsers: $availableToUsers }) {
			success
		}
	}`;
