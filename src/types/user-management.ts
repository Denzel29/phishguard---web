import { USER_STATUS } from './enums';

export enum USER_ROLE {
	ADMIN = 'ADMIN',
	RECRUITER = 'RECRUITER',
	HIRING_MANAGER = 'HIRING_MANAGER'
}

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: USER_ROLE;
	department: string;
	joinDate: string;
	status: USER_STATUS;
	avatar?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface AddUserFormData {
	firstName: string;
	lastName: string;
	email: string;
	role: USER_ROLE;
	department: string;
}

export interface EditUserFormData extends AddUserFormData {
	id: string;
}

export const ROLE_BADGE_CONFIG = {
	[USER_ROLE.ADMIN]: {
		label: 'Admin',
		className: 'bg-red-100 text-red-800 border-red-200'
	},
	[USER_ROLE.RECRUITER]: {
		label: 'Recruiter',
		className: 'bg-blue-100 text-blue-800 border-blue-200'
	},
	[USER_ROLE.HIRING_MANAGER]: {
		label: 'Hiring Manager',
		className: 'bg-green-100 text-green-800 border-green-200'
	}
} as const;

export const DEPARTMENTS = [
	'HR',
	'Engineering',
	'Marketing',
	'Sales',
	'Finance',
	'Operations',
	'Product',
	'Design'
] as const;
