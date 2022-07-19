import { gql } from '@apollo/client';

export const UpdatePostMutation = gql`
    mutation ($id: ID!, $shortUrl: String, $title: String, $description: String, $image: String, $imageLabel: String, $content: JSON, $availableToUsers: Boolean) {
        updatePost(id: $id, post: {shortUrl: $shortUrl, title: $title, description: $description, image: $image, imageLabel: $imageLabel, content: $content, availableToUsers: $availableToUsers}) {
            success
        }
    }`;
