import {
	ACCOUNT_STATUS,
	COMPANY_STATUS,
	GENDER,
	JOB_LOCATION,
	JOB_STATUS,
	RECRUITER_DEMO_STATUS,
	USER_STATUS
} from '@/types/enums';

export interface ResponseData {
	success: boolean;
	message: string;
	data: Record<string, unknown>;
}

export interface CandidateResponse {
	status: number;
	data: ResponseData;
}

export interface CandidateError {
	message: string;
	[key: string]: unknown;
}

export interface BaseEntity {
	id: string;
	createdBy: string;
	updatedBy: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface BrandSettings {
	companySlug: string;
	brandColor: string;
	publicJobBoardEnabled: boolean;
}
interface IBaseColumn extends BaseEntity {
	name: string;
	companyId: string;
}

export interface JobTemplate extends IBaseColumn {
	description: string;
	employmentType: string;
	hiringLeadId: string; // Id must be employee id
	hiringLead: User;
	recruiterId: string;
	recruiter: User;
	departmentId: string;
	department: Department;
	minimumExperience: string;
	currency: string;
	minSalary: number;
	maxSalary: number;
	jobLocation: JOB_LOCATION; // In Office, Hybrid, Remote
	location: string;
	internalJobCode: string;
	requiredSkills: string[];
	jobTitle: string;
}

export interface Job extends JobTemplate {
	status: JOB_STATUS;
	applicationDeadline: Date;
}

export interface Company extends BaseEntity {
	name: string;
	description: string;
	displayName: string;
	logo_url: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	status: COMPANY_STATUS;
	email: string;
	website?: string;
	industry?: string;
	location?: string;
	branding?: BrandSettings;

	// applications: Application[];
	// branches: Branch[];
	// departments: Department[];
	// users: User[];
	// positions: Position[];
}

export interface RecruiterDemo extends BaseEntity {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	companyName: string;
	demoDate: string;
	status: RECRUITER_DEMO_STATUS;
}

export interface User extends BaseEntity {
	firstName: string;
	lastName: string;
	email: string;
	roleId: string;
	role: Role;
	phoneNumber: string;
	dateOfBirth: Date;
	gender: GENDER;
	companyId?: string;
	departmentId?: string;
	department: Department;
	// branchId?: string;
	// company!: Company;
	userAuth: UserAuth;
	joinDate: string;
	status: USER_STATUS;
	avatar?: string;
}

export interface Role extends BaseEntity {
	companyId?: string;
	description?: string;
	name: string;
	isCustom?: boolean;
	rolePermissions: RolePermission[];
}

export interface RolePermission extends BaseEntity {
	roleId: string;
	permissionId: string;
	permission: Permission;
	role: Role;
}

export interface Permission extends BaseEntity {
	name: string;
	key: string;
	description: string;
	category: PermissionCategory;
}

export interface PermissionCategory extends BaseEntity {
	name: string;
	description: string;
	permissions: Permission[];
}

export interface UserAuth extends BaseEntity {
	userType: string;
	accountStatus: ACCOUNT_STATUS;
}

export interface Department extends BaseEntity {
	name: string;
	description: string;
}

export interface CompaniesResponse {
	success: boolean;
	message: string;
	data: Company[];
}

export interface CompanyResponse {
	success: boolean;
	message: string;
	data: Company;
}

export interface REcruiterDemoResponse {
	success: boolean;
	message: string;
	data: RecruiterDemo[];
}

export interface UserReponse {
	success: boolean;
	message: string;
	data: User[];
}

export interface RoleResponse {
	success: boolean;
	message: string;
	data: Role[];
}

export interface PermissionCategoryResponse {
	success: boolean;
	message: string;
	data: PermissionCategory[];
}

export interface DepartmentsResponse {
	success: boolean;
	data: Department[];
	message: string;
}
export interface JobTemplatesResponse {
	success: boolean;
	data: JobTemplate[];
	message: string;
}
export interface JobsResponse {
	success: boolean;
	data: Job[];
	message: string;
}
