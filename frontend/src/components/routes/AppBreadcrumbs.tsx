import { Breadcrumbs } from '@mui/material';
import React from 'react';
import {
	Link,
	Location,
	useLocation,
	useParams,
	matchPath,
	generatePath,
} from 'react-router-dom';
import routes, { AppRoute, AppRouteWithChildren, hasChildren } from './routes';

interface RenderBreadcrumbsElementProps {
	children: React.ReactNode | React.ReactNode[]
}

const buildPath = (route: AppRoute | AppRouteWithChildren, location: Location): AppRoute[] => {
	if (route.path === '*') {
		return [];
	}

	if (matchPath(route.path, location.pathname)) {
		return [route];
	}

	if (hasChildren(route)) {
		const possiblePath = route.children.flatMap((child) => buildPath(child, location));

		if (possiblePath.length) {
			return [route, ...possiblePath];
		}
	}

	return [];
};

const AppBreadcrumbs = (props: RenderBreadcrumbsElementProps) => {
	const { children } = props;

	const location = useLocation();
	const params = useParams();
	const path = buildPath(routes[0], location)
		.map((route) => ({ ...route, path: generatePath(route.path, params) }));

	return (
		<>
			<Breadcrumbs aria-label="breadcrumb">
				{path.map((p) => (
					<Link key={`link-${p.name}`} color="inherit" to={p.path}>
						{p.name}
					</Link>
				))}
			</Breadcrumbs>
			{children}
		</>
	);
};

export default AppBreadcrumbs;
