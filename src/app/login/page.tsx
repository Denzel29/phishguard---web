'use client';

import { useState } from 'react';
import { apiRequest } from '@/lib/api';
import type { LoginResponse } from '@/types/shared';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			const data = await apiRequest<LoginResponse>('/auth/login', {
				method: 'POST',
				body: { email, password }
			});
			// TODO: persist token (httpOnly cookie via a backend session route
			// is the safer long-term choice over localStorage)
			console.log('logged in as', data.user.email);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Login failed');
		} finally {
			setLoading(false);
		}
	}

	return (
		<main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 px-6">
			<h1 className="text-xl font-semibold">Log in</h1>

			<form onSubmit={handleSubmit} className="flex flex-col gap-3">
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="rounded border px-3 py-2"
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="rounded border px-3 py-2"
					required
				/>

				{error && <p className="text-sm text-red-600">{error}</p>}

				<button
					type="submit"
					disabled={loading}
					className="rounded bg-black px-3 py-2 text-white disabled:opacity-50"
				>
					{loading ? 'Logging in…' : 'Log in'}
				</button>
			</form>
		</main>
	);
}
