import { DefaultSession } from 'next-auth';
import { USER_TYPES } from '@/types/enums';

// Extend NextAuth types to include userType

declare module 'next-auth' {
	interface User {
		id: string;
		email: string;
		userId: string;
		firstName: string;
		lastName: string;
		image: string;
		token: string;
		userType?: USER_TYPES;
	}
	interface Session {
		user: {
			id: string;
			email: string;
			userId: string;
			firstName: string;
			lastName: string;
			image: string;
			token: string;
			userType?: USER_TYPES;
		} & DefaultSession['user'];
		accessToken?: string;
		idToken?: string;
	}
}
declare module 'next-auth/jwt' {
	interface JWT {
		provider?: string;
		accessToken?: string;
		idToken?: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		userType?: string; // <-- Add userType
	}
}
