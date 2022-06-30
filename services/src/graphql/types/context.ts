import { AppUser } from '../../types/users';

export interface Context {
    user?: AppUser,
    isAuthenticated: boolean,
}
