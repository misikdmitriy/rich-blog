import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes, { AppRoute, AppRouteWithChildren, hasChildren } from './routes';

const buildRoutes = (
	appRoutes: (AppRoute | AppRouteWithChildren)[],
): React.ReactNode[] => appRoutes.map((route) => [
	(<Route
		key={route.name}
		path={route.path}
		element={route.element}
	/>),
	...(hasChildren(route) ? buildRoutes(route.children) : []),
]);

const AppRoutes = () => (
	<Routes>
		{buildRoutes(routes)}
	</Routes>
);

export default AppRoutes;
