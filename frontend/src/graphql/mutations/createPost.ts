import { gql } from '@apollo/client';

export const CreatePostMutation = gql`
    mutation ($shortUrl: String!, $title: String!, $description: String!, $image: String!, $imageLabel: String!, $body: String!) {
        createPost(post: {shortUrl: $shortUrl, title: $title, description: $description, image: $image, imageLabel: $imageLabel, body: $body}) {
            id
        }
    }`;
