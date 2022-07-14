import { AppContext } from '../../types/app';
import { AppRole } from '../../types/users';

const {
	ALLOW_ANONYMOUS,
} = process.env;

const allowAnonymous = ALLOW_ANONYMOUS === 'true';

export const requireAuth = (
	{ user, isAuthenticated }: AppContext,
	requiredRole: AppRole,
	...roles: AppRole[]
) => {
	if (allowAnonymous) {
		// skip validation
		return;
	}

	const allRoles = [requiredRole, ...roles];

	if (!isAuthenticated) {
		throw new Error('authentication required');
	}

	if (!allRoles.some((role) => user?.roles.includes(role))) {
		const requiredRoles = allRoles.join(', ');
		throw new Error(`at least one role required: '${requiredRoles}'`);
	}
};
