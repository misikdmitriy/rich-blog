import { AppUser } from './users';

export interface AppContext {
    user?: AppUser,
    isAuthenticated: boolean,
}
