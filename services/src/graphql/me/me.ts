import { AppContext } from '../../types/app';

const me = (
	_parent: unknown,
	_args: unknown,
	{ user, isAuthenticated } : AppContext,
) => ({ user, isAuthenticated });

export default me;
