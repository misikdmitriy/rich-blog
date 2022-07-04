import { WithId } from 'mongodb';

type GoogleEmail = {
    value: string;
    verified: boolean;
}

export type GoogleUser = {
    id: string;
    emails: GoogleEmail[];
}

export type AppRole = 'user' | 'admin'

export type AppUserNoRoleNoId = {
    externalId: string
    email?: string
    provider: string;
}

export type AppUserNoRole = AppUserNoRoleNoId & {
    id: string
}

export type AppUser = AppUserNoRole & {
    roles: AppRole[]
}

export type AppUserDocument = WithId<AppUser>
