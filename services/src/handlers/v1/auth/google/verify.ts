import { Request } from 'express';
import { VerifyCallback } from 'passport-google-oauth2';
import { AppUser, AppUserNoRole, GoogleUser } from '../../../../types/users';
import { findOneAndUpdate } from '../../../../db';

const {
	USERS_COLLECTION = 'users',
} = process.env;

export const verify = async (
	_req: Request,
	_accessToken: string,
	_refreshToken: string,
	profile: GoogleUser,
	done: VerifyCallback,
) => {
	try {
		const user: AppUserNoRole = {
			email: profile.emails[0]?.value,
			provider: 'google',
			externalId: profile.id,
		};

		const result = await findOneAndUpdate<AppUser>(
			USERS_COLLECTION,
			user,
			{ externalId: user.externalId },
			{ upsert: true, returnDocument: 'after' },
		);

		if (result.ok) {
			done(null, { roles: ['user'], ...result.value });
		} else {
			done(new Error('cannot save user to DB'), null);
		}
	} catch (err) {
		done(new Error('unknown error'), null);
	}
};
