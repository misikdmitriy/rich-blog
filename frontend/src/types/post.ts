export interface Post {
	id: string,
	shortUrl: string,
	title: string
	description: string
	image: string
	imageLabel: string
	body: string
	createdDate: Date
}

export interface PostsResponse {
	posts: Post[]
	hasNext: boolean
}
