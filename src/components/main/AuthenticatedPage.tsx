import React, { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import LoadingIndicator from '@ui/loadingIndicator/LoadingIndicator';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export type AuthProps = {
	roles: string[];
	permissions: string[];
};

export type AuthenticatedPageProps = {
	auth: AuthProps;
};

const AuthenticatedPage: React.FC<AuthenticatedPageProps> = ({ children, auth }) => {
	const { t } = useTranslation();
	const { status, data } = useSession({ required: true });
	const router = useRouter();

	useEffect(() => {
		const logout = async (error: unknown) => {
			const signOutResponse = await signOut({ redirect: false, callbackUrl: `/auth/signin?error=${error}` });
			router.push(signOutResponse.url);
		};

		if (data) {
			const { error } = data;
			if (error) {
				logout(error);
			}
		}
	}, [data]);

	if (status === 'loading') {
		return <LoadingIndicator>{t('loading')}</LoadingIndicator>;
	}

	const { user } = data || {};
	const { roles: userRoles = [], permissions: userPermissions = [] } = user || {};

	const { permissions = [], roles = [] } = auth;

	const hasValidRoles = roles.length ? userRoles.findIndex((userRole) => roles.includes(userRole.value)) !== -1 : true;
	const hasValidPermission = permissions.length
		? userPermissions.findIndex((permission) => permissions.includes(permission)) !== -1
		: true;

	if (hasValidRoles && hasValidPermission) return children as React.ReactElement;

	return (
		<div>
			<h1>You are not authorized to view this page!</h1>
		</div>
	);
};

export default AuthenticatedPage;
