import { PostsResponse } from '../types/post';
import { fetchApi } from './common';

const basePath = '/api/v1/posts';

export const fetchPosts = (
	pageNum = 0,
	pageSize = 10,
) => fetchApi<PostsResponse>(basePath, { queryParams: { pageNum, pageSize } });
