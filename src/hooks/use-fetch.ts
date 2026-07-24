import {
	UseMutationResult,
	useMutation,
	useQuery,
	useQueryClient
} from '@tanstack/react-query';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { z } from 'zod';
import { ACCOUNT_STATUS, COMPANY_STATUS } from '@/types/enums';
import {
	CompaniesResponse,
	CompanyResponse,
	DepartmentsResponse,
	JobTemplatesResponse,
	JobsResponse,
	PermissionCategoryResponse,
	REcruiterDemoResponse,
	ResponseData,
	RoleResponse,
	UserReponse
} from '@/types/types';
import { client } from '@/lib/axios-client';
import {
	AddUserSchema,
	CreateDepartmentSchema,
	CreateJobSchema,
	CreateRoleSchema,
	EditUserSchema,
	LoginSchema,
	RegisterInternalTeamSchema,
	RequestDemoSchema,
	ResetPasswordSchema,
	SignupSchema,
	UpdateCompanySchema,
	changePasswordSchema,
	createCompanySchema
} from '@/schemas/auth/auth';

// Utility to create a query key from URL and params
const generateQueryKey = (url: string, params?: Record<string, unknown>) => [
	url,
	params || {}
];

// Generic useFetch for queries (GET requests)
export function useFetch<T = unknown>(
	url: string,
	config: AxiosRequestConfig = {}
) {
	const queryKey = generateQueryKey(url, config.params);

	const query = useQuery<AxiosResponse<T, unknown>, Error>({
		queryKey,
		queryFn: () => client.get(url, config),
		enabled: !!url, // Only run if url is provided
		...config // Allow passing additional React Query options
	});

	return {
		data: query.data?.data || null, // Access the response data
		loading: query.isLoading,
		error: query.error,
		refetch: query.refetch
	};
}

// Generic useFetchMutation for mutations (POST/PUT requests)
export function useFetchMutation<T = unknown, V = unknown>(
	url: string,
	method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST',
	options: AxiosRequestConfig = {}
): UseMutationResult<AxiosResponse<T, unknown>, Error, V, unknown> {
	const queryClient = useQueryClient();
	const queryKey = generateQueryKey(url);

	const mutation = useMutation<AxiosResponse<T, unknown>, Error, V, unknown>({
		mutationFn: (variables) =>
			client[method.toLowerCase() as 'post' | 'put' | 'patch' | 'delete'](
				url,
				variables,
				options
			),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey }); // Invalidate cache on success
		},
		...options // Allow passing additional mutation options
	});

	return mutation;
}

// Specific mutation for the demo request
export const useRequestDemo = (): UseMutationResult<
	AxiosResponse<{ success: boolean; message?: string }, unknown>,
	Error,
	z.infer<typeof RequestDemoSchema>,
	unknown
> => useFetchMutation('/recruiters/demo', 'POST');

// Specific query to get recruiters
export function useGetRecruiters(config: AxiosRequestConfig = {}) {
	return useFetch<{ recruiters: unknown[] }>('/recruiters', config);
}

export const useCandidateSignUp = (): UseMutationResult<
	AxiosResponse<ResponseData, unknown>,
	Error,
	z.infer<typeof SignupSchema>,
	unknown
> => {
	return useFetchMutation<ResponseData, z.infer<typeof SignupSchema>>(
		'/candidates',
		'POST'
	);
};

export const usePasswordLogin = (): UseMutationResult<
	AxiosResponse<ResponseData, unknown>,
	Error,
	z.infer<typeof LoginSchema>,
	unknown
> => {
	return useFetchMutation<ResponseData, z.infer<typeof LoginSchema>>(
		'/login',
		'POST'
	);
};

export const useGoogleLoginRequest = (): UseMutationResult<
	AxiosResponse<{ success: boolean; message?: string }, unknown>,
	Error,
	z.infer<typeof RequestDemoSchema>,
	unknown
> => useFetchMutation('/auth/google', 'POST');

//Specific mutation for jobseeker signup
export const useJobseekerSignup = (): UseMutationResult<
	AxiosResponse<{ success: boolean; message?: string }, unknown>,
	Error,
	z.infer<typeof SignupSchema>,
	unknown
> => useFetchMutation('/candidates', 'POST');

//Specific mutation for generating a reset password token
export const useForgotPassword = (): UseMutationResult<
	AxiosResponse<{ success: boolean; message?: string }, unknown>,
	Error,
	z.infer<typeof ResetPasswordSchema>,
	unknown
> => useFetchMutation('/forgot-password', 'POST');

//Specific mutation for checking the validity of a reset token
export const useTokenValidation = (): UseMutationResult<
	AxiosResponse<{ success: boolean; message?: string }, unknown>,
	Error,
	{ resetToken: string },
	unknown
> => {
	return useFetchMutation<
		{ success: boolean; message?: string },
		{ resetToken: string }
	>('/validate-token', 'POST');
};

//specific mutation for resetting the password | creating a new password
export const useChangePasswordMutation = (): UseMutationResult<
	AxiosResponse<{ success: boolean; message?: string }, unknown>,
	Error,
	z.infer<typeof changePasswordSchema>,
	unknown
> => useFetchMutation('/reset-password', 'POST');

export function useGetCompany(config: AxiosRequestConfig = {}) {
	return useFetch<CompanyResponse>(`/company`, config);
}

export function useGetCompaniesByStatus(
	status: string,
	config: AxiosRequestConfig = {}
) {
	return useFetch<CompaniesResponse>(`/companies/status/${status}`, config);
}

export const useUpdateCompany = (): UseMutationResult<
	AxiosResponse<{ success: boolean; message?: string }, unknown>,
	Error,
	z.infer<typeof UpdateCompanySchema>,
	unknown
> => useFetchMutation('/company', 'PATCH');

export function useCheckCompanySlug(
	slug: string,
	config: AxiosRequestConfig = {}
) {
	return useFetch<{ isAvailable: boolean }>(
		`/companies/check-slug/${slug}`,
		config
	);
}

export function useGetDemos(config: AxiosRequestConfig = {}) {
	return useFetch<REcruiterDemoResponse>(`/recruiters/demo`, config);
}

export const useOnboardCompanyAfterDemo = (): UseMutationResult<
	AxiosResponse<{ success: boolean; message?: string }, unknown>,
	Error,
	unknown
> => useFetchMutation('/companies/after-demo', 'POST');

export const useOnboardCompany = (): UseMutationResult<
	AxiosResponse<{ success: boolean; message?: string }, unknown>,
	Error,
	z.infer<typeof createCompanySchema>,
	unknown
> => useFetchMutation('/companies/without-demo', 'POST');

export const useChangeCompanyStatus = (
	companyId: string
): UseMutationResult<
	AxiosResponse<{ success: boolean; message?: string }, unknown>,
	Error,
	{ status: COMPANY_STATUS },
	unknown
> => useFetchMutation(`/companies/${companyId}`, 'PATCH');

//Mutation to activate/ deactivate an admin
export const useChangeAdminStatus = (
	adminId: string
): UseMutationResult<
	AxiosResponse<{ success: boolean; message?: string }, unknown>,
	Error,
	{ accountStatus: ACCOUNT_STATUS },
	unknown
> => useFetchMutation(`/admins/change-status/${adminId}`, 'PATCH');

export const useUpdateRecruiterDemo = (): UseMutationResult<
	AxiosResponse<{ success: boolean; message?: string }, unknown>,
	Error,
	z.infer<typeof RequestDemoSchema>,
	unknown
> => useFetchMutation(`/recruiters/demo`, 'PUT');

export const useGetAdmins = (config: AxiosRequestConfig = {}) => {
	return useFetch<UserReponse>(`/admins`, config);
};

export const useAdminGetRole = (config: AxiosRequestConfig = {}) => {
	return useFetch<RoleResponse>('/admins/roles/', config);
};

export const useAddInternalTeamMember = (): UseMutationResult<
	AxiosResponse<ResponseData, unknown>,
	Error,
	z.infer<typeof RegisterInternalTeamSchema>,
	unknown
> => {
	return useFetchMutation<
		ResponseData,
		z.infer<typeof RegisterInternalTeamSchema>
	>('/admins/', 'POST');
};

export const useUpdateInternalTeamMember = (
	adminId: string
): UseMutationResult<
	AxiosResponse<ResponseData, unknown>,
	Error,
	z.infer<typeof RegisterInternalTeamSchema>,
	unknown
> => {
	return useFetchMutation<
		ResponseData,
		z.infer<typeof RegisterInternalTeamSchema>
	>(`/admins/${adminId}`, 'PATCH');
};

export const useCreateDepartment = (): UseMutationResult<
	AxiosResponse<ResponseData, unknown>,
	Error,
	z.infer<typeof CreateDepartmentSchema>,
	unknown
> => {
	return useFetchMutation<ResponseData, z.infer<typeof CreateDepartmentSchema>>(
		'/departments',
		'POST'
	);
};

export const useUpdateDepartment = (
	departmentId: string
): UseMutationResult<
	AxiosResponse<ResponseData, unknown>,
	Error,
	z.infer<typeof CreateDepartmentSchema>,
	unknown
> => {
	return useFetchMutation<ResponseData, z.infer<typeof CreateDepartmentSchema>>(
		`/departments/${departmentId}`,
		'PATCH'
	);
};

export const useDeleteDepartment = (
	departmentId: string
): UseMutationResult<
	AxiosResponse<ResponseData, unknown>,
	Error,
	unknown,
	unknown
> => {
	return useFetchMutation<ResponseData, unknown>(
		`/departments/${departmentId}`,
		'DELETE'
	);
};

export const useGetCompanyRoles = (config: AxiosRequestConfig = {}) => {
	return useFetch<RoleResponse>('/roles/company/', config);
};

export const useGetDepartments = (config: AxiosRequestConfig = {}) => {
	return useFetch<DepartmentsResponse>('/departments', config);
};

export const useCreateUser = (): UseMutationResult<
	AxiosResponse<ResponseData, unknown>,
	Error,
	z.infer<typeof AddUserSchema>,
	unknown
> => {
	return useFetchMutation<ResponseData, z.infer<typeof AddUserSchema>>(
		'/users',
		'POST'
	);
};

export const useGetUsers = (config: AxiosRequestConfig = {}) => {
	return useFetch<UserReponse>('/users/company', config);
};

export const useEditUser = (
	userId: string
): UseMutationResult<
	AxiosResponse<ResponseData, unknown>,
	Error,
	z.infer<typeof EditUserSchema>,
	unknown
> => {
	return useFetchMutation<ResponseData, z.infer<typeof EditUserSchema>>(
		`/users/${userId}`,
		'PATCH'
	);
};

export const useDeleteUser = (): UseMutationResult<
	AxiosResponse<ResponseData, unknown>,
	Error,
	string, // This is the type for the userId parameter passed to mutateAsync
	unknown
> => {
	return useMutation({
		mutationFn: async (userId: string) => {
			return await client.delete(`/users/${userId}`);
		}
	});
};

export const useFetchPermissions = (config: AxiosRequestConfig = {}) => {
	return useFetch<PermissionCategoryResponse>('/role-permissions', config);
};

export const useCreateRole = (): UseMutationResult<
	AxiosResponse<ResponseData, unknown>,
	Error,
	z.infer<typeof CreateRoleSchema>,
	unknown
> => {
	return useFetchMutation<ResponseData, z.infer<typeof CreateRoleSchema>>(
		'/roles/company',
		'POST'
	);
};

export const useEditRole = (
	roleId: string
): UseMutationResult<
	AxiosResponse<ResponseData, unknown>,
	Error,
	z.infer<typeof CreateRoleSchema>,
	unknown
> => {
	return useFetchMutation<ResponseData, z.infer<typeof CreateRoleSchema>>(
		`/roles/company/${roleId}`,
		'PATCH'
	);
};

export const useDeleteRole = (
	roleId: string
): UseMutationResult<
	AxiosResponse<ResponseData, unknown>,
	Error,
	unknown,
	unknown
> => {
	return useFetchMutation<ResponseData, unknown>(
		`/roles/company/${roleId}`,
		'DELETE'
	);
};

export const useCreateJob = (): UseMutationResult<
	AxiosResponse<ResponseData, unknown>,
	Error,
	z.infer<typeof CreateJobSchema>,
	unknown
> => {
	return useFetchMutation<ResponseData, z.infer<typeof CreateJobSchema>>(
		'/jobs',
		'POST'
	);
};

export const useGetJobs = (config: AxiosRequestConfig = {}) => {
	return useFetch<JobsResponse>('/jobs', config);
};

export const useGetJobTemplates = (config: AxiosRequestConfig = {}) => {
	return useFetch<JobTemplatesResponse>('/job/templates', config);
};
