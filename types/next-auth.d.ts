import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	export type UserRoleFD = {
		value: string;
		label: string;
	};

	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			roles: UserRoleFD[];
			permissions: string[];
			firstName?: string;
			lastName?: string;
		} & DefaultSession['user'];
		accessToken: string;
		idToken: string;
		error: unknown;
	}
}
