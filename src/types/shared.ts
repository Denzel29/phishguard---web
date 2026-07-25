// Mirrors server/src/types/enums.ts. Since the Next.js static export can't
// import directly from the Express project, these are kept in sync by hand.
// If this drift becomes a real problem, the fix is a shared `packages/types`
// workspace both projects pull from -- not worth the setup cost yet.

export enum UserType {
	Individual = 'individual',
	Organization = 'organization'
}

export enum CampaignStatus {
	DRAFT = 'draft',
	ACTIVE = 'active',
	COMPLETED = 'completed',
	ARCHIVED = 'archived'
}

export enum SandboxEventType {
	VIEWED_EMAIL = 'viewed_email',
	CLICKED_LINK = 'clicked_link',
	VIEWED_FAKE_SITE = 'viewed_fake_site',
	SUBMITTED_CREDENTIALS = 'submitted_credentials',
	REPORTED_PHISHING = 'reported_phishing'
}

export enum ScenarioDifficulty {
	OBVIOUS = 'obvious',
	MODERATE = 'moderate',
	SUBTLE = 'subtle'
}

export interface Organization {
	id: string;
	name: string;
	planTier: string;
}

export interface AuthUser {
	id: string;
	name: string;
	email: string;
	organizationId: string | null;
	roleId: string;
}

export interface LoginResponse {
	token: string;
	user: AuthUser;
}

export interface Scenario {
	id: string;
	name: string;
	lureType: string;
	difficulty: ScenarioDifficulty;
	sandboxFlow: Record<string, unknown>[];
	redFlags: string[];
}

export interface Campaign {
	id: string;
	name: string;
	organizationId: string | null;
	scenarioId: string;
	status: CampaignStatus;
	launchTime: string | null;
}

// The envelope every backend response follows (see server response.util.ts)
export interface ApiResponse<T> {
	success: boolean;
	message: string;
	data?: T;
	errors?: { field?: string; message: string }[];
}
