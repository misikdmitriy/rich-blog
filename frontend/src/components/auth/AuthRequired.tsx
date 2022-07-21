import { Box } from '@mui/material';
import React from 'react';
import { useAuth } from './Auth';

type AuthRequiredProps = Record<string, unknown> & {
    children: React.ReactNode | React.ReactNode[]
    authRole?: string
}

const AuthRequired = (props: AuthRequiredProps) => {
	const { children, authRole, ...other } = props;

	const auth = useAuth();

	const {
		data,
	} = auth || {};
	const { isAuthenticated, user } = data?.me || {};

	if (!isAuthenticated || (authRole && !user?.roles.includes(authRole))) {
		return null;
	}

	return <Box {...other}>{children}</Box>;
};

AuthRequired.defaultProps = {
	authRole: undefined,
};

export default AuthRequired;
