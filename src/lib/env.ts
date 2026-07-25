/* eslint-disable n/no-process-env */
import { createEnv } from '@t3-oss/env-nextjs';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { z } from 'zod';

if (typeof window === 'undefined') {
	expand(config());
}

export const env = createEnv({
	client: {
		NEXT_PUBLIC_BACKEND_URL: z.string().url(),
		NEXT_PUBLIC_NODE_ENV: z.enum(['development', 'production', 'test'])
	},
	server: {
		NEXTAUTH_URL: z.string().url(),
		NEXTAUTH_SECRET: z.string(),
		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_CLIENT_SECRET: z.string(),
		AZURE_AD_CLIENT_ID: z.string(),
		AZURE_AD_CLIENT_SECRET: z.string(),
		AZURE_AD_TENANT_ID: z.string()
	},
	onValidationError: (error: unknown) => {
		if (typeof window === 'undefined') {
			// eslint-disable-next-line no-console
			console.error(
				'❌ Invalid environment variables:',
				JSON.stringify(error, null, 2)
			);

			process.exit(1);
		}
		throw new Error(
			'Invalid environment variables: ${JSON.stringify(error, null, 2)}'
		);
	},
	isServer: typeof window === 'undefined',
	emptyStringAsUndefined: true,
	runtimeEnv: {
		// client environment variables
		NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
		NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
		// server environment variables
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		AZURE_AD_CLIENT_ID: process.env.AZURE_AD_CLIENT_ID,
		AZURE_AD_CLIENT_SECRET: process.env.AZURE_AD_CLIENT_SECRET,
		AZURE_AD_TENANT_ID: process.env.AZURE_AD_TENANT_ID
	}
});
