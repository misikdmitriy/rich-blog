export interface Post {
	id: string,
	title: string
	description: string
	image: string
	imageLabel: string
	body: string
	createdDate: Date
}

export interface PostsResponse {
	docs: Post[]
}
