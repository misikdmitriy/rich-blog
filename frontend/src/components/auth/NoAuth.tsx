import { Box } from '@mui/material';
import React from 'react';
import { useAuth } from './Auth';

type AuthRequiredProps = Record<string, unknown> & {
    children: React.ReactNode | React.ReactNode[]
}

const NoAuth = (props: AuthRequiredProps) => {
	const { children, ...other } = props;

	const auth = useAuth();

	const {
		data, loading, error,
	} = auth || {};
	const { isAuthenticated } = data?.me || {};

	if (loading || error || !isAuthenticated) {
		return <Box {...other}>{children}</Box>;
	}

	return null;
};

export default NoAuth;
