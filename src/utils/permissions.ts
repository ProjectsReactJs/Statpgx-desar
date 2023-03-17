import { DefaultSession, UserRoleFD } from 'next-auth';

export type SessionUser = {
	roles: UserRoleFD[];
	permissions: string[];
} & DefaultSession['user'];

export enum PermissionsEnum {
	AnnouncementRead = 'AnnouncementRead',
	AnnouncementWrite = 'AnnouncementWrite',
	DashboardHCCount = 'DashboardHCCount',
	FileMgmtDateFilter = 'FileMgmtDateFilter',
	FileMgmtStatusChange = 'FileMgmtStatusChange',
	LabSetupWrite = 'LabSetupWrite',
	RoleRead = 'RoleRead',
	RoleWrite = 'RoleWrite',
	TestFormOptions = 'TestFormOptions',
	UserRead = 'UserRead',
	UserWrite = 'UserWrite',
}

export function hasPermissions(userPermissions: string[], permissions: string[]) {
	return userPermissions.findIndex((userPemission) => permissions.includes(userPemission)) !== -1;
}
