export enum USER_TYPES {
	RECRUITER = 'RECRUITER',
	CANDIDATE = 'CANDIDATE',
	INTERNAL_TEAM = 'INTERNAL_TEAM',
	USER = 'USER'
}

export enum ADMIN_PANEL_OPTIONS {
	COMPANY_MANAGEMENT = 'COMPANY_MANAGEMENT',
	AUDIT_TRAIL = 'AUDIT_TRAIL',
	USER_MANAGEMENT = 'USER_MANAGEMENT'
}

export enum COMPANY_STATUS {
	ACTIVE = 'ACTIVE',
	SUSPENDED = 'SUSPENDED'
}

export enum RECRUITER_DEMO_STATUS {
	PENDING = 'PENDING',
	DEMO_CONFRIMED = 'DEMO CONFRIMED',
	DECLINED = 'DECLINED',
	APPROVED = 'APPROVED'
}

export enum COMPANY_TAB_TYPE {
	PENDING_DEMO = 'PENDING_DEMO',
	ACTIVE = 'ACTIVE',
	SUSPENDED = 'SUSPENDED'
}
export enum JOB_MANAGEMENT_TAB_TYPE {
	JOBS = 'JOBS',
	JOB_REQUISITIONS = 'JOB_REQUISITIONS',
	JOB_TEMPLATES = 'JOB_TEMPLATES'
}

export enum ACCOUNT_STATUS {
	ACTIVE = 'ACTIVE',
	SUSPENDED = 'SUSPENDED'
}

export enum GENDER {
	MALE = 'MALE',
	FEMALE = 'FEMALE'
}

export enum RECRUITER_SETTINGS_TABS {
	COMPANY_PROFILE = 'Company Profile',
	BRANDING_URL = 'Branding & URL',
	PIPELINE = 'Pipeline',
	APPROVAL_WORKFLOW = 'Approval Workflow',
	EMAIL_TEMPLATES = 'Email Templates'
}

export enum USER_STATUS {
	ACTIVE = 'Active',
	INACTIVE = 'Inactive',
	PENDING = 'Pending',
	SUSPENDED = 'Suspended'
}

export enum JOB_LOCATION {
	ONSITE = 'ONSITE',
	REMOTE = 'REMOTE',
	HYBRID = 'HYBRID'
}

export enum EMPLOYMENT_TYPE {
	FULL_TIME = 'FULL TIME',
	PART_TIME = 'PART TIME',
	CONRTACTOR = 'CONTRACTOR',
	INTERN = 'INTERN'
}

export enum JOB_STATUS {
	// Initial state when job is being created/edited
	DRAFT = 'DRAFT',
	// Job is published and accepting applications
	PUBLISHED = 'PUBLISHED',
	// Job is temporarily not accepting applications
	ON_HOLD = 'ON_HOLD',
	// Job position has been filled
	FILLED = 'FILLED',
	// Job is no longer active but kept for records
	ARCHIVED = 'ARCHIVED',
	// Job was cancelled before completion
	CANCELLED = 'CANCELLED'
}

export enum CURRENCIES {
	USD = 'USD',
	RWF = 'RWF', // Rwandan Franc
	NGN = 'NGN', // Nigerian Naira
	ZAR = 'ZAR', // South African Rand
	KES = 'KES', // Kenyan Shilling
	GHS = 'GHS', // Ghanaian Cedi
	TZS = 'TZS', // Tanzanian Shilling
	UGX = 'UGX', // Ugandan Shilling
	ZMW = 'ZMW' // Zambian Kwacha
}
