export interface Post {
	id: string,
	shortUrl: string,
	title: string
	description: string
	image: string
	imageLabel: string
	content: string
	createdDate: Date
}

export interface PostContent {
	title: string,
	content: string
}

export interface PostsResponse {
	posts: Post[]
	hasNext: boolean
}
