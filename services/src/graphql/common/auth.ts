import { AppContext } from '../../types/app';
import { AppRole } from '../../types/users';

export const requireAuth = (
	{ user, isAuthenticated }: AppContext,
	requiredRole: AppRole,
	...roles: AppRole[]
) => {
	const allRoles = [requiredRole, ...roles];

	if (!isAuthenticated) {
		throw new Error('authentication required');
	}

	if (!allRoles.some((role) => user?.roles.includes(role))) {
		const requiredRoles = allRoles.join(', ');
		throw new Error(`at least one role required: '${requiredRoles}'`);
	}
};
