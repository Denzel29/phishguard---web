// import {
// 	NextAuthOptions,
// 	getServerSession as getServerSessionNextAuth
// } from 'next-auth';
// import AzureADProvider from 'next-auth/providers/azure-ad';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';
// import { USER_TYPES } from '@/types/enums';
// import { env } from '@/lib/env';
// import { handleApiErrors } from '@/utils/error';

// const baseUrl = env.NEXT_PUBLIC_BACKEND_URL;

// const socalLoginUrl = `${baseUrl}/auth/verify-token`;
// const loginUrl = `${baseUrl}/login`;

// export const authOptions: NextAuthOptions = {
// 	providers: [
// 		GoogleProvider({
// 			clientId: env.GOOGLE_CLIENT_ID,
// 			clientSecret: env.GOOGLE_CLIENT_SECRET,
// 			authorization: { params: { prompt: 'select_account' } }
// 		}),
// 		AzureADProvider({
// 			clientId: env.AZURE_AD_CLIENT_ID,
// 			clientSecret: env.AZURE_AD_CLIENT_SECRET,
// 			tenantId: env.AZURE_AD_TENANT_ID,
// 			authorization: { params: { prompt: 'select_account' } }
// 		}),
// 		CredentialsProvider({
// 			id: 'credentials',
// 			name: 'credentials',
// 			credentials: {
// 				email: { label: 'Email', type: 'email' },
// 				password: { label: 'Password', type: 'password' },
// 				userType: { label: 'User Type', type: 'text' }
// 			},
// 			async authorize(credentials) {
// 				if (!credentials?.email || !credentials?.password) return null;

// 				try {
// 					const response = await fetch(loginUrl, {
// 						method: 'POST',
// 						headers: { 'Content-Type': 'application/json' },
// 						body: JSON.stringify({
// 							email: credentials.email,
// 							password: credentials.password,
// 							userType: credentials.userType || 'user'
// 						})
// 					});

// 					const backendResponse = await response.json();

// 					if (
// 						!response.ok ||
// 						!backendResponse.success ||
// 						!backendResponse.data
// 					) {
// 						// Throw the actual backend error message
// 						throw new Error(backendResponse.message || 'Authentication failed');
// 					}

// 					const { token, user: backendUser } = backendResponse.data;
// 					return {
// 						id: backendUser.id,
// 						email: backendUser.email,
// 						name: `${backendUser.firstName} ${backendUser.lastName}`,
// 						token,
// 						userId: backendUser.id,
// 						firstName: backendUser.firstName,
// 						lastName: backendUser.lastName,
// 						userType: backendUser.userType,
// 						image: backendUser.image || ''
// 					};
// 				} catch (error: unknown) {
// 					// Re-throw with the actual error message
// 					if (error && typeof error === 'object' && 'message' in error) {
// 						throw new Error(
// 							(error as { message?: string }).message || 'Authentication failed'
// 						);
// 					}
// 					throw new Error('Authentication failed');
// 				}
// 			}
// 		})
// 	],
// 	secret: env.NEXTAUTH_SECRET,
// 	session: { strategy: 'jwt' },
// 	callbacks: {
// 		async signIn({ user, account }) {
// 			if (account?.provider === 'google' || account?.provider === 'azure-ad') {
// 				try {
// 					const response = await fetch(socalLoginUrl, {
// 						method: 'POST',
// 						headers: { 'Content-Type': 'application/json' },
// 						body: JSON.stringify({
// 							provider: account.provider,
// 							accessToken: account.access_token,
// 							idToken: account.id_token
// 						})
// 					});
// 					if (!response.ok) {
// 						const values = {
// 							provider: account.provider,
// 							accessToken: account.access_token,
// 							idToken: account.id_token
// 						};
// 						const errorData = await response.json().catch(() => ({}));
// 						handleApiErrors({ ...response, data: errorData }, values);
// 						throw new Error('User verification failed');
// 					}

// 					const backendResponse = await response.json();
// 					if (backendResponse.success && backendResponse.data) {
// 						const { token, user: backendUser } = backendResponse.data;

// 						Object.assign(user, {
// 							token,
// 							userId: backendUser.id,
// 							firstName: backendUser.firstName,
// 							lastName: backendUser.lastName,
// 							userType: backendUser.userType,
// 							email: backendUser.email,
// 							name: `${backendUser.firstName} ${backendUser.lastName}`
// 						});

// 						return true;
// 					} else {
// 						const values = {
// 							provider: account.provider,
// 							accessToken: account.access_token,
// 							idToken: account.id_token
// 						};
// 						handleApiErrors(backendResponse, values);
// 						throw new Error('Authentication failed');
// 					}
// 				} catch (error) {
// 					const values = {
// 						provider: account.provider,
// 						accessToken: account.access_token,
// 						idToken: account.id_token
// 					};
// 					handleApiErrors(error, values);
// 					return false;
// 				}
// 			}
// 			return account?.provider === 'credentials';
// 		},
// 		async jwt({ token, user, account }) {
// 			if (account && user) {
// 				token.provider = account.provider;
// 				token.name = `${user.firstName} ${user.lastName}`;
// 				token.userId = user.userId;
// 				token.firstName = user.firstName;
// 				token.lastName = user.lastName;
// 				token.userType = user.userType;
// 				token.picture = user.image;
// 				token.email = user.email;
// 				token.accessToken = user.token;
// 				token.userType = user.userType;
// 			}
// 			return token;
// 		},
// 		async session({ session, token }) {
// 			session.user.userId = token.userId as string;
// 			session.user.name = token.name as string;
// 			session.user.firstName = token.firstName as string;
// 			session.user.lastName = token.lastName as string;
// 			session.user.userType = token.userType as USER_TYPES;
// 			session.user.email = token.email as string;
// 			session.user.image = token.picture as string;
// 			session.user.token = token.accessToken as string;
// 			session.user.userId = token.userId as string;
// 			session.accessToken = token.accessToken as string;
// 			return session;
// 		}
// 	},
// 	pages: {
// 		signIn: '/auth/signin',
// 		error: '/auth/error'
// 	}
// };

// export async function getServerSession() {
// 	return await getServerSessionNextAuth(authOptions);
// }

// export type Session = Awaited<ReturnType<typeof getServerSession>>;
