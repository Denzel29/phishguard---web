import axios, { AxiosError, AxiosResponse } from 'axios';
import { getSession } from 'next-auth/react';
import { env } from '@/lib/env';

const API_URL = env.NEXT_PUBLIC_BACKEND_URL;

const options = {
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
		accept: 'application/json'
	}
};

const multiFormOptions = {
	baseURL: API_URL,
	headers: {
		'Content-Type': 'multipart/form-data',
		accept: 'application/json'
	}
};

export const getToken = async (): Promise<string> => {
	const session = await getSession();
	return session?.user?.token ? `Bearer ${session.user.token}` : '';
};

const client = axios.create(options);
const mClient = axios.create(multiFormOptions);

const addAuthInterceptor = (axiosInstance: typeof client) => {
	axiosInstance.interceptors.request.use(async (config) => {
		try {
			const token = await getToken();
			if (config.headers && token) {
				(config.headers as Record<string, string>).Authorization = token;
			}
		} catch (error) {
			console.error('Error getting auth token:', error);
		}
		return config;
	});

	axiosInstance.interceptors.response.use(
		(response: AxiosResponse) => response,
		(error: AxiosError) => {
			if (error.response?.status === 401) {
				window.location.href = '/auth/signin';
				return Promise.resolve();
			}
			return Promise.reject(error);
		}
	);
};

addAuthInterceptor(client);
addAuthInterceptor(mClient);

export { client, mClient };
