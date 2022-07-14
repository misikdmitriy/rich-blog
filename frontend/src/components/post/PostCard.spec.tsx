import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Post } from '../../types/post';
import PostCard from './PostCard';

describe('PostCard', () => {
	const post: Post = {
		id: '62d04cc36d3881c902280116',
		shortUrl: '/short-url',
		title: 'Random Title',
		description: 'Some description',
		image: 'http://image.com/jpg',
		imageLabel: 'image alt',
		content: '{}',
		createdDate: new Date(Date.parse('Dec 25, 1995')),
		availableFor: ['user'],
	};

	it('renders without crashing', () => {
		const tree = renderer
			.create(<MemoryRouter><PostCard post={post} /></MemoryRouter>)
			.toJSON();

		expect(tree).toMatchSnapshot();
	});
});
