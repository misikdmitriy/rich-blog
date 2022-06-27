import { WithId } from 'mongodb';

type GoogleName = {
    familyName: string;
    givenName: string;
}

type GoogleEmail = {
    value: string;
    verified: boolean;
}

interface GooglePhoto {
    value: string;
}

export type GoogleUser = {
    id: string;
    displayName: string;
    name: GoogleName;
    emails: GoogleEmail[];
    photos: GooglePhoto[];
    provider: string;
}

export type AppUser = {
    externalId: string
    email?: string
    provider: string;
}

export type AppUserDocument = WithId<AppUser>
