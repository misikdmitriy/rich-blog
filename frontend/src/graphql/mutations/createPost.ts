import { gql } from '@apollo/client';

export const CreatePostMutation = gql`
    mutation ($shortUrl: String!, $title: String!, $description: String!, $image: String!, $imageLabel: String!, $content: JSON!) {
        createPost(post: {shortUrl: $shortUrl, title: $title, description: $description, image: $image, imageLabel: $imageLabel, content: $content}) {
            id
        }
    }`;
