import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
} from '@apollo/client';
import {
	indigo, teal, red, deepOrange,
} from '@mui/material/colors';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/index.scss';
import { PostsResponse } from './types/post';
import './i18n';

const theme = createTheme({
	palette: {
		primary: red,
		secondary: deepOrange,
		success: teal,
		info: indigo,
	},
	typography: {
		fontFamily: [
			'Work Sans',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	},
	spacing: 4,
});

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				posts: {
					keyArgs: false,
					merge: (existing: PostsResponse | undefined, incoming: PostsResponse) => ({
						hasNext: incoming.hasNext,
						posts: [...(existing?.posts || []), ...incoming.posts],
					}),
				},
			},
		},
	},
});

const client = new ApolloClient({
	uri: '/graphql',
	cache,
});

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<ApolloProvider client={client}>
					<App />
				</ApolloProvider>
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
