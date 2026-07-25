// 'use client';

// import { ComponentType } from 'react';
// import {
// 	BarChart3,
// 	Bell,
// 	Briefcase,
// 	Building2,
// 	Mail,
// 	Plug,
// 	Settings,
// 	UserPlus,
// 	Users,
// 	Workflow
// } from 'lucide-react';
// import { Company } from '@/types/types';
// import { JOB_MANAGEMENT_TAB_TYPE } from './enums';

// export type NavigationItem<T = object> = {
// 	name: string;
// 	icon: ComponentType<{ className?: string }>;
// 	component: ComponentType<T>;
// };

// export const navigationItems: NavigationItem[] = [
// 	{ name: 'Candidate Pipeline', icon: Users, component: CandidatePipeline },
// 	{ name: 'Job Management', icon: Briefcase, component: JobManagement },
// 	{ name: 'Analytics', icon: BarChart3, component: Analytics },
// 	{ name: 'User Management', icon: UserPlus, component: UserManagement },
// 	{ name: 'Integrations', icon: Plug, component: Integrations },
// 	{
// 		name: 'Email Notifications',
// 		icon: Bell,
// 		component: RecruiterNotifications
// 	},
// 	{ name: 'Company Settings', icon: Settings, component: RecruiterSettings }
// ];

// export const settingsTabs: NavigationItem<{
// 	formData: Company;
// 	handleInputChange: (field: string, value: string) => void;
// 	handleSave: () => void;
// }>[] = [
// 	{
// 		name: 'Company Profile',
// 		icon: Settings,
// 		// component: CompanySettings
// 	},
// 	{
// 		name: 'Branding & URL',
// 		icon: Building2,
// 		// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 		component: BrandingSettings as unknown as ComponentType<any>
// 	},
// 	{
// 		name: 'Pipeline',
// 		icon: Users,
// 		component: PipelineSettings
// 	},
// 	{
// 		name: 'Approval Workflow',
// 		icon: Workflow,
// 		component: WorkflowSettings
// 	},
// 	{
// 		name: 'Email Templates',
// 		icon: Mail,
// 		component: EmailTemplatesSettings
// 	}
// ];

// export const jobManagementTabs: NavigationItem<{
// 	activeTab: JOB_MANAGEMENT_TAB_TYPE;
// 	setActiveTab: (tab: JOB_MANAGEMENT_TAB_TYPE) => void;
// }>[] = [
// 	{ name: 'Jobs', icon: Briefcase, component: Jobs },
// 	{ name: 'Requisitions', icon: Briefcase, component: Requisitions },
// 	{ name: 'Templates', icon: Briefcase, component: Templates }
// ];
