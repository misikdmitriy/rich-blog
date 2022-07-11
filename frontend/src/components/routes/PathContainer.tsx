import React from 'react';
import AppBreadcrumbs from './AppBreadcrumbs';

interface PathContainerProps {
    children: React.ReactNode | React.ReactNode[];
}

const PathContainer = (props: PathContainerProps) => {
	const { children } = props;

	return (
		<AppBreadcrumbs>
			{children}
		</AppBreadcrumbs>
	);
};

export default PathContainer;
