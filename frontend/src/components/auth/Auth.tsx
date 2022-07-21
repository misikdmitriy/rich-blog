import React, { createContext, useContext } from 'react';
import { QueryResult, useQuery } from '@apollo/client';
import { AppUser } from '../../types/user';
import { Me } from '../../graphql/queries/me';

interface AuthResult {
	isAuthenticated: boolean,
	user?: AppUser
}

const AuthContext = createContext<QueryResult<{me: AuthResult}> | undefined>(undefined);

interface AuthProps {
    children: React.ReactNode | React.ReactNode[]
}

const Auth = (props: AuthProps) => {
	const { children } = props;
	const result = useQuery<{me: AuthResult}>(Me);

	return (
		<AuthContext.Provider value={result}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

export default Auth;
